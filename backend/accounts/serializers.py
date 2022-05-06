from rest_framework import serializers
from .models import CustomUser, UserAddress, UserDetails


class UserAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAddress
        fields = '__all__'


class CustomUserDetailsSerializer(serializers.ModelSerializer):
    address = UserAddressSerializer(read_only=True)

    class Meta:
        model = UserDetails
        fields = '__all__'


class CustomUserSerializer(serializers.ModelSerializer):
    details = CustomUserDetailsSerializer(read_only=True)

    class Meta:
        model = CustomUser
        fields = ('email', 'first_name', 'last_name', 'details')
