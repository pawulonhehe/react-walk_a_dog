# 3rd-party
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework import permissions
from rest_framework.generics import CreateAPIView
from rest_framework.generics import ListAPIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
import datetime

# Project
from accounts.models import CustomUser

# Local
from .models import Dog
from .models import Slot
from .models import Trainer
from .serializers import CustomUserSerializer
from .serializers import DogCreateSerializer
from .serializers import DogSerializer
from .serializers import SlotSerializer


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter


class CustomUserListView(ListAPIView):
    name = 'customuser-list'
    queryset = CustomUser.objects.filter(is_active=True)
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.AllowAny]


class CustomUserDetailView(RetrieveUpdateDestroyAPIView):
    name = 'customuser-detail'
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.AllowAny]


class DogListView(ListAPIView):
    name = 'dog-list'
    queryset = Dog.objects.all()
    serializer_class = DogSerializer
    permission_classes = [permissions.AllowAny]


class DogDetailView(RetrieveUpdateDestroyAPIView):
    name = 'dog-detail'
    serializer_class = DogSerializer
    queryset = Dog.objects.all()
    permission_classes = [permissions.AllowAny]


class DogCreateView(CreateAPIView):
    name = 'dog-create'
    serializer_class = DogCreateSerializer
    permission_classes = [permissions.AllowAny]


class SlotListView(ListAPIView):
    name = 'Slot-list'
    queryset = Slot.objects.all()
    serializer_class = SlotSerializer
    permission_classes = [permissions.AllowAny]


class SlotDetailView(RetrieveUpdateDestroyAPIView):
    name = 'Slot-detail'
    queryset = Slot.objects.all()
    serializer_class = SlotSerializer
    permission_classes = [permissions.AllowAny]


class SlotCreateView(CreateAPIView):
    name = 'Slot-create'
    serializer_class = SlotSerializer
    permission_classes = [permissions.AllowAny]


class TrainerListView(ListAPIView):
    name = 'trainer-list'
    queryset = CustomUser.objects.filter(is_trainer=True)
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.AllowAny]


class TrainerDetailView(RetrieveUpdateDestroyAPIView):
    name = 'trainer-detail'
    queryset = CustomUser.objects.filter(is_trainer=True)
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.AllowAny]


class SlotCountView(APIView):
    name = 'slot-count'

    def get(self, request, trainer_id):
        """
        Return the number of slots available for a given date for trainer 
        """
        trainer = self.kwargs.get('trainer_id')
        try:
            user = CustomUser.objects.get(id=trainer, is_trainer=True)
        except CustomUser.DoesNotExist:
            return Response({'error': 'Trenera nie znaleziono.'}, status=404)

        slots = Slot.objects.filter(date=datetime.date.today(), trainer=trainer)
        return Response({'count': 5 - slots.count()})
