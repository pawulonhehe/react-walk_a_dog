"""Api serializers."""
# Standard Library
from django.utils.dateparse import parse_datetime
import datetime
# 3rd-party
from rest_framework import serializers
from rest_framework.authtoken.models import Token

# Project
from accounts.models import CustomUser

# Local
from .models import Dog
from .models import DogRating
from .models import Slot
from .models import TrainerRating

class DogsInWalkSerializer(serializers.ModelSerializer):  # noqa: D101
    class Meta:  # noqa: D106
        model = Dog
        fields = ('id','name',)

class TokenSerializer(serializers.ModelSerializer):  # noqa: D101
    is_trainer = serializers.SerializerMethodField()
    class Meta:  # noqa: D106
        model = Token
        fields = ('key', 'user', 'is_trainer')

    def get_is_trainer(self, obj):  # noqa: D102
        return obj.user.is_trainer


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
            'is_trainer',
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
            'is_trainer',
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
            raise serializers.ValidationError('Na jednym spacerze mog?? by?? maksymalnie 3 psy.')
        return value

    def validate(self, attrs):  # noqa: D102
        try:
            walk_id = self.context['request'].parser_context['kwargs']['pk']
            walk = Slot.objects.get(id=walk_id)

            date = walk.date
            start_time = walk.start_time
            end_time = walk.end_time
            trainer = walk.trainer
        except KeyError:
            date = ''
            start_time = ''
            end_time = ''
            trainer = ''

        if attrs.get('date'):
            date = attrs.get('date')
        if attrs.get('start_time'):
            start_time = attrs.get('start_time')
        if attrs.get('end_time'):
            end_time = attrs.get('end_time')
        if attrs.get('trainer'):
            trainer = attrs.get('trainer')
        if attrs.get('dogs'):
            print('jest pies')
            dogs = attrs.get('dogs')
            if len(dogs) > 3:
                raise serializers.ValidationError('Na jednym spacerze mog?? by?? maksymalnie 3 psy.')
            attrs['dog_count'] = len(dogs)
            filters = {
                'date': date,
                'start_time__lte': end_time,
                'end_time__gte': start_time,
            }
            for dog in dogs:
                if Slot.objects.filter(dogs=dog.id, **filters).exclude(pk=walk_id).exists():
                    raise serializers.ValidationError('Pies znajduje si?? ju?? w innym spacerze.')
            
        walks_count = trainer.slot_set.filter(
            date=date,
        )

        if walks_count.count() >= 5:
            raise serializers.ValidationError(
                'Jeden trener mo??e odby?? tylko 5 spacer??w jednego dnia.')
        if start_time and end_time:
            if start_time >= end_time:
                raise serializers.ValidationError(
                    'Czas zako??czenia musi by?? p????niejszy ni?? czas rozpocz??cia.')

        return attrs


class SlotHistorySerializer(serializers.ModelSerializer):  # noqa: D101
    dogs = CustomUserDogSerializer(many=True, read_only=True)
    class Meta:  # noqa: D106
        model = Slot
        fields = '__all__'


class DogInWalkSerializer(serializers.ModelSerializer):  # noqa: D101
    class Meta:  # noqa: D106
        model = Slot
        fields = '__all__'


class ActiveWalksTrainerSerializer(serializers.ModelSerializer):  # noqa: D101

    class Meta:  # noqa: D106
        model = CustomUser
        fields = (
            'id',
            'first_name',
            'last_name',
        )


class UserWalksSerializer(serializers.ModelSerializer):  # noqa: D101
    dogs = DogCreateSerializer(many=True, read_only=True)
    trainer = ActiveWalksTrainerSerializer(read_only=True)

    class Meta:  # noqa: D106
        model = Slot
        fields = '__all__'


class IncomingWalksOwnerSerializer(serializers.ModelSerializer):  # noqa: D101
    class Meta:  # noqa: D106
        model = CustomUser
        fields = (
            'id',
        )


class IncomingWalksDogSerializer(serializers.ModelSerializer):  # noqa: D101
    owner = IncomingWalksOwnerSerializer(read_only=True)

    class Meta:  # noqa: D106
        model = Dog
        fields = (
            'id',
            'name',
            'owner',
        )


class IncomingWalksTrainerSerializer(serializers.ModelSerializer):  # noqa: D101
    class Meta:  # noqa: D106
        model = CustomUser
        fields = (
            'id',
            'first_name',
            'last_name',
        )


class IncomingWalksSerializer(serializers.ModelSerializer):  # noqa: D101
    dogs = IncomingWalksDogSerializer(many=True, read_only=True)
    trainer = IncomingWalksTrainerSerializer(read_only=True)

    class Meta:  # noqa: D106
        model = Slot
        fields = '__all__'


class DogRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = DogRating
        fields = '__all__'

    def create(self, validated_data):
        dog = validated_data.get('dog')
        walk = validated_data.get('walk')
        evaluator = validated_data.get('evaluator')
        if DogRating.objects.filter(dog=dog, walk=walk, evaluator=evaluator).exists():
            raise serializers.ValidationError('Ju?? oceniono psa w tym spacerze.')
        return super().create(validated_data)


class TrainerRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainerRating
        fields = '__all__'

    def create(self, validated_data):
        trainer = validated_data.get('trainer')
        evaluator = validated_data.get('evaluator')
        if trainer == evaluator:
            raise serializers.ValidationError('Nie mo??esz oceni?? samego siebie.')
        if TrainerRating.objects.filter(trainer=trainer, evaluator=evaluator).exists():
            raise serializers.ValidationError('Ju?? oceni??e?? trenera.')
        return super().create(validated_data)
