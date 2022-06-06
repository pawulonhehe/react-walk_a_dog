"""Api serializers."""
from pprint import pprint
# 3rd-party
from rest_framework import serializers
from rest_framework.authtoken.models import Token

# Project
from accounts.models import CustomUser
from accounts.models import UserAddress

# Local
from .models import Dog
from .models import Slot


class TokenSerializer(serializers.ModelSerializer):  # noqa: D101
    class Meta:  # noqa: D106
        model = Token
        fields = ('key', 'user')


class UserAddressSerializer(serializers.ModelSerializer):  # noqa: D101
    class Meta:  # noqa: D106
        model = UserAddress
        fields = '__all__'


class OwnerSerializer(serializers.ModelSerializer):  # noqa: D101
    class Meta:  # noqa: D106
        model = CustomUser
        fields = (
            'id',
            'email',
            'first_name',
            'last_name',
        )


class DogSerializer(serializers.ModelSerializer):  # noqa: D101
    owner = OwnerSerializer(read_only=True)

    class Meta:  # noqa: D106
        model = Dog
        fields = '__all__'


class DogCreateSerializer(serializers.ModelSerializer):  # noqa: D101
    class Meta:  # noqa: D106
        model = Dog
        fields = '__all__'


class CustomUserDogSerializer(serializers.ModelSerializer):  # noqa: D101

    class Meta:  # noqa: D106
        model = Dog
        exclude = ('owner',)


class CustomUserSerializer(serializers.ModelSerializer):  # noqa: D101
    dogs = CustomUserDogSerializer(many=True, read_only=True)

    class Meta:  # noqa: D106
        model = CustomUser
        fields = (
            'id',
            'email',
            'first_name',
            'last_name',
            'phone_number',
            'image',
            'dogs',
        )


class TrainerSerializer(serializers.ModelSerializer):  # noqa: D101
    class Meta:  # noqa: D106
        model = CustomUser
        fields = (
            'id',
            'email',
            'first_name',
            'last_name',
            'phone_number',
            'image',
        )


class SlotListSerializer(serializers.ModelSerializer):  # noqa: D101
    dogs = CustomUserDogSerializer(many=True, read_only=True)
    trainer = TrainerSerializer(read_only=True)

    class Meta:  # noqa: D106
        model = Slot
        fields = '__all__'


class SlotSerializer(serializers.ModelSerializer):  # noqa: D101
    dog_count = serializers.SerializerMethodField()

    def get_dog_count(self, obj):  # noqa: D102
        return obj.dogs.count()

    class Meta:  # noqa: D106
        model = Slot
        fields = '__all__'

    def update(self, instance, validated_data):  # noqa: D102
        print('wchodze tu')
        instance = super().update(instance, validated_data)
        id_list = [instance.trainer.id]
        for dog in instance.dogs.all():
            id_list.append(dog.owner_id)

        return instance

    def create(self, validated_data):  # noqa: D102
        instance = super().create(validated_data)
        id_list = [instance.trainer.id]
        for dog in instance.dogs.all():
            id_list.append(dog.owner_id)
        return instance

    def validate_dogs(self, value):  # noqa: D102
        if len(value) > 3:
            raise serializers.ValidationError('Na jednym spacerze mogą być maksymalnie 3 psy.')
        return value

    def validate(self, attrs):  # noqa: D102
        walk_id = self.context['request'].parser_context['kwargs']['pk']
        walk = Slot.objects.get(id=walk_id)
        
        date = walk.date
        start_time = walk.start_time
        end_time = walk.end_time
        trainer = walk.trainer

        if attrs.get('date'):
            date = attrs.get('date')
        if attrs.get('start_time'):
            start_time = attrs.get('start_time')
        if attrs.get('end_time'):
            end_time = attrs.get('end_time')
        if attrs.get('trainer'):
            trainer = CustomUser.objects.get(id=attrs.get('trainer'))
        if attrs.get('dogs'):
            dogs = attrs.get('dogs')
            if len(dogs) > 3:
                raise serializers.ValidationError('Na jednym spacerze mogą być maksymalnie 3 psy.')
            filters = {
                'date': date,
                'start_time__lte': end_time,
                'end_time__gte': start_time,
                'trainer': trainer,
            }
            for dog in dogs:
                if Slot.objects.filter(dogs=dog.id, **filters).exclude(pk=walk_id).exists():
                    raise serializers.ValidationError('Pies znajduje się już w innym spacerze.')

        walks_count = trainer.slot_set.filter(
            date=date,
        )

        if walks_count.count() >= 5:
            raise serializers.ValidationError(
                'Jeden trener może odbyć tylko 5 spacerów jednego dnia.')
        if start_time and end_time:
            if start_time >= end_time:
                raise serializers.ValidationError(
                    'Czas zakończenia musi być późniejszy niż czas rozpoczęcia.')

        return attrs


class SlotHistorySerializer(serializers.ModelSerializer):  # noqa: D101
    class Meta:  # noqa: D106
        model = Slot
        exclude = ('id',)


class DogInWalkSerializer(serializers.ModelSerializer):  # noqa: D101
    class Meta:  # noqa: D106
        model = Slot
        fields = '__all__'