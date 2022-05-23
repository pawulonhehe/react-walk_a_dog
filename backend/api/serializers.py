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
    dogs = CustomUserDogSerializer(many=True, read_only=True)
    trainer = CustomUserSerializer(read_only=True)

    class Meta:
        model = Slot
        fields = '__all__'

    def validate_dogs(self, value):
        if len(value) > 3:
            raise serializers.ValidationError('Na jednym spacerze mogą być maksymalnie 3 psy.')
        return value

    def validate(self, attrs):
        try:
            pk = self.context['pk']
        except KeyError:
            pk = None
        date = attrs.get('date')
        start_time = attrs.get('start_time')
        end_time = attrs.get('end_time')
        trainer = attrs.get('trainer')
        print(trainer.pk)
        walks_count = trainer.slot_set.filter(
            date=date,
        )
        if walks_count.count() >= 5:
            raise serializers.ValidationError(
                'Jeden trener może odbyć tylko 5 spacerów jednego dnia.')

        if start_time >= end_time:
            raise serializers.ValidationError(
                'Czas zakończenia musi być późniejszy niż czas rozpoczęcia.')

        dogs = attrs.get('dogs')
        for i in range(len(dogs)):
            if Slot.objects.filter(dogs=dogs[i], date=date, end_time__gte=start_time, start_time__lte=end_time).exclude(pk=pk).exists():  # noqa: E501
                raise serializers.ValidationError(f'Pies {dogs[i]} jest już na innym spacerze w tym czasie.')  # noqa: E501

        if trainer.slot_set.filter(date=date, end_time__gte=start_time, start_time__lte=end_time).exclude(pk=pk).exists():
            raise serializers.ValidationError('Trener jest już na innym spacerze w tym czasie.')

        return attrs
