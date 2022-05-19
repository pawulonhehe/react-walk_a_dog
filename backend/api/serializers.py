from accounts.models import CustomUser, UserAddress, UserDetails
from .models import Dog, Walk
from rest_framework import serializers
from rest_framework.authtoken.models import Token
class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = ('key','user',)

class UserAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAddress
        fields = '__all__'


class CustomUserDetailsSerializer(serializers.ModelSerializer):
    address = UserAddressSerializer(read_only=True)

    class Meta:
        model = UserDetails
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


class CustomUserDogSerializer(serializers.ModelSerializer):

    class Meta:
        model = Dog
        exclude = ('owner',)


class CustomUserSerializer(serializers.ModelSerializer):
    details = CustomUserDetailsSerializer(read_only=True)
    dogs = CustomUserDogSerializer(many=True, read_only=True)

    class Meta:
        model = CustomUser
        fields = (
            'email',
            'first_name',
            'last_name',
            'details',
            'is_trainer',
            'dogs',
        )


class WalkSerializer(serializers.ModelSerializer):
    dog = DogSerializer(read_only=True)
    trainer = CustomUserSerializer(read_only=True)

    class Meta:
        model = Walk
        fields = '__all__'
