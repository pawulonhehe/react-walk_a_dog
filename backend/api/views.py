from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveAPIView
from .serializers import CustomUserSerializer
from accounts.models import CustomUser
from .models import Dog, Walk
from .serializers import DogSerializer, WalkSerializer


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter


class CustomUserListView(ListAPIView):
    name = 'customuser-list'
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.AllowAny]


class CustomUserDetailView(RetrieveAPIView):
    name = 'customuser-detail'
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.AllowAny]


class DogDetailView(RetrieveAPIView):
    name = 'dog-detail'
    serializer_class = DogSerializer
    queryset = Dog.objects.all()
    permission_classes = [permissions.AllowAny]


class DogListView(ListAPIView):
    name = 'dog-list'
    queryset = Dog.objects.all()
    serializer_class = DogSerializer
    permission_classes = [permissions.AllowAny]


class WalkDetailView(RetrieveAPIView):
    name = 'walk-detail'
    queryset = Walk.objects.all()
    serializer_class = WalkSerializer
    permission_classes = [permissions.AllowAny]


class WalkListView(ListAPIView):
    name = 'walk-list'
    queryset = Walk.objects.all()
    serializer_class = WalkSerializer
    permission_classes = [permissions.AllowAny]
