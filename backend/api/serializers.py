# 3rd-party
from rest_framework import serializers
from rest_framework.authtoken.models import Token

# Project
from accounts.models import CustomUser
from accounts.models import UserAddress

# Local
from .models import Dog
from .models import Slot
from .models import Trainer


class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = ('key', 'user',)


class UserAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAddress
        fields = '__all__'


class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = (
            'id',
            'email',
            'first_name',
            'last_name',
        )


class DogSerializer(serializers.ModelSerializer):
    owner = OwnerSerializer(read_only=True)

    class Meta:
        model = Dog
        fields = '__all__'


class DogCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dog
        fields = '__all__'


class CustomUserDogSerializer(serializers.ModelSerializer):

    class Meta:
        model = Dog
        exclude = ('owner',)


class CustomUserSerializer(serializers.ModelSerializer):
    dogs = CustomUserDogSerializer(many=True, read_only=True)

    class Meta:
        model = CustomUser
        fields = (
            'id',
            'email',
            'first_name',
            'last_name',
            'dogs',
        )


class SlotSerializer(serializers.ModelSerializer):

    class Meta:
        model = Slot
        fields = '__all__'
    
    def validate(self, attrs):
        """Walk limit validation: 5 walks for trainer per day."""
        try:
            pk = self.context['pk']
        except KeyError:
            pk = None
        date = attrs.get('date')
        req_date = attrs.get('start_time')
        req_date_end = attrs.get('end_time')
        trainer = attrs.get('trainer')
        walks_day = trainer.walk_set.filter(
            date__day=req_date.day,
            date__month=req_date.month,
            date__year=req_date.year,
        )
        if walks_day.count() >= 5:  # check walks limit
            raise serializers.ValidationError('Trener może mieć dziennie tylko 5 spacerów!')

        if req_date >= req_date_end:  # check correct dates
            raise serializers.ValidationError('Data początkowa jest starsza od daty końca!')

    

        dogs = attrs.get('dogs')
        for i in range(len(dogs)):  # check if dog is not in other walk in the same time
            if Slot.objects.filter(dogs=dogs[i], date_end__gte=req_date, date__lte=req_date_end).exclude(pk=pk).exists():  # noqa: E501
                raise serializers.ValidationError(f'{dogs[i]} jest już na spacerze w tym czasie!')

        if trainer.walk_set.filter(date_end__gte=req_date, date__lte=req_date_end).exclude(pk=pk).exists():  # noqa: E501
            # check if trainer is available in that time
            raise serializers.ValidationError('Trener jest już na spacerze w tym czasie!')

        return attrs

class TrainerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trainer

    def validate(self, data):
        if data['start_time'] >= data['end_time']:
            raise serializers.ValidationError(
                'Start time must be before end time.'
            )
        return data
