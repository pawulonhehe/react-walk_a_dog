"""Api views."""

# Standard Library
import datetime

# Django
from django.utils.dateparse import parse_datetime

# 3rd-party
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework import permissions
from rest_framework.generics import CreateAPIView
from rest_framework.generics import ListAPIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

# Project
from accounts.models import CustomUser

# Local
from .models import Dog
from .models import Slot
from .serializers import CustomUserSerializer
from .serializers import DogCreateSerializer
from .serializers import DogSerializer
from .serializers import SlotHistorySerializer
from .serializers import SlotListSerializer
from .serializers import SlotSerializer


class FacebookLogin(SocialLoginView):  # noqa: D101
    adapter_class = FacebookOAuth2Adapter


class CustomUserListView(ListAPIView):  # noqa: D101
    name = 'customuser-list'
    queryset = CustomUser.objects.filter(is_active=True)
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.AllowAny]


class CustomUserDetailView(RetrieveUpdateDestroyAPIView):  # noqa: D101
    name = 'customuser-detail'
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.AllowAny]


class DogListView(ListAPIView):  # noqa: D101
    name = 'dog-list'
    queryset = Dog.objects.all()
    serializer_class = DogSerializer
    permission_classes = [permissions.AllowAny]


class DogDetailView(RetrieveUpdateDestroyAPIView):  # noqa: D101
    name = 'dog-detail'
    serializer_class = DogSerializer
    queryset = Dog.objects.all()
    permission_classes = [permissions.AllowAny]


class DogCreateView(CreateAPIView):  # noqa: D101
    name = 'dog-create'
    serializer_class = DogCreateSerializer
    permission_classes = [permissions.AllowAny]


class SlotListView(ListAPIView):  # noqa: D101
    name = 'slot-list'
    queryset = Slot.objects.all()
    serializer_class = SlotListSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):  # noqa: D102
        qs = super().get_queryset()
        date_time = datetime.datetime.now()
        current_date = datetime.date.today()
        qs_filter = qs.filter(date__gte=current_date)
        id_list = []
        for obj in qs_filter:
            date_time2 = f'{obj.date}T{obj.start_time}'
            date_time2 = parse_datetime(date_time2)
            if date_time2 < date_time:
                id_list.append(obj.id)
        qs_exclude = qs_filter.exclude(id__in=id_list)
        return qs_exclude.order_by('date', 'start_time')


class SlotDetailView(RetrieveUpdateDestroyAPIView):  # noqa: D101
    name = 'slot-detail'
    queryset = Slot.objects.all()
    serializer_class = SlotSerializer
    permission_classes = [permissions.AllowAny]


class SlotCreateView(CreateAPIView):  # noqa: D101
    name = 'slot-create'
    serializer_class = SlotSerializer
    permission_classes = [permissions.AllowAny]


class TrainerListView(ListAPIView):  # noqa: D101
    name = 'trainer-list'
    queryset = CustomUser.objects.filter(is_trainer=True)
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.AllowAny]


class TrainerDetailView(RetrieveUpdateDestroyAPIView):  # noqa: D101
    name = 'trainer-detail'
    queryset = CustomUser.objects.filter(is_trainer=True)
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.AllowAny]


class SlotCountView(APIView):  # noqa: D101
    name = 'slot-count'

    def get(self, request, trainer_id):
        """Return the number of slots available for a given date for trainer."""
        trainer = self.kwargs.get('trainer_id')
        try:
            CustomUser.objects.get(id=trainer, is_trainer=True)
        except CustomUser.DoesNotExist:
            return Response({'error': 'Trenera nie znaleziono.'}, status=404)

        slots = Slot.objects.filter(date=datetime.date.today(), trainer=trainer)
        return Response({'count': 5 - slots.count()})


class TrainerWalkHistory(ListAPIView):  # noqa: D101
    name = 'walk-history'
    serializer_class = SlotHistorySerializer

    def get_queryset(self):  # noqa: D102

        slots = Slot.objects.filter(trainer=self.kwargs.get('pk'))
        return slots
