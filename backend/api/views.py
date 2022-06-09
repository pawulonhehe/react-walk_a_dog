"""Api views."""

# Standard Library
import datetime

# Django
from django.db.models import Avg
from django.utils.dateparse import parse_datetime

# 3rd-party
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework import permissions
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.generics import ListAPIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

# Project
from accounts.models import CustomUser

# Local
from .models import Dog, DogRating, TrainerRating
from .models import Slot
from .serializers import CustomUserSerializer, DogRatingSerializer, TrainerRatingSerializer
from .serializers import DogCreateSerializer
from .serializers import DogSerializer
from .serializers import IncomingWalksSerializer
from .serializers import SlotHistorySerializer
from .serializers import SlotListSerializer
from .serializers import SlotSerializer
from .serializers import UserWalksSerializer


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


class DogInWalkAPIView(ListAPIView):  # noqa: D101
    name = 'dog-in-walk'

    serializer_class = SlotSerializer

    def get_queryset(self):  # noqa: D102
        return Slot.objects.filter(
            dogs__owner_id=self.kwargs['pk'],
            date=datetime.date.today(),
            end_time__gte=datetime.datetime.now(),
            start_time__lte=datetime.datetime.now(),
        ).distinct()


class UserWalksListAPIView(ListAPIView):  # noqa: D101
    name = 'user-walks'
    serializer_class = UserWalksSerializer

    def get_queryset(self):  # noqa: D102
        return Slot.objects.filter(
            dogs__owner_id=self.kwargs['pk'],
            date=datetime.date.today(),
            end_time__gte=datetime.datetime.now(),
            start_time__lte=datetime.datetime.now(),
        ).distinct()


class UserWalksHistoryAPIView(ListAPIView):  # noqa: D101
    name = 'user-walks-history'
    serializer_class = UserWalksSerializer

    def get_queryset(self):  # noqa: D102
        return Slot.objects.filter(
            dogs__owner_id=self.kwargs['pk'],
            date__lt=datetime.date.today(),
            date__gte=datetime.date.today() - datetime.timedelta(days=30),
        ).distinct()


class UserWalksIncomingAPIView(ListAPIView):  # noqa: D101
    name = 'user-walks-incoming'
    serializer_class = IncomingWalksSerializer

    def get_queryset(self):  # noqa: D102
        qs = Slot.objects.filter(
            dogs__owner_id=self.kwargs['pk'],
            date__gte=datetime.date.today(),
        )
        date_time = datetime.datetime.now()
        id_list = []
        for obj in qs:
            date_time2 = f'{obj.date}T{obj.start_time}'
            date_time2 = parse_datetime(date_time2)
            if date_time2 < date_time:
                id_list.append(obj.id)
        qs_exclude = qs.exclude(id__in=id_list)
        return qs_exclude.distinct().order_by('date', 'start_time')


class AddDogRating(CreateAPIView):
    name = 'dog-rating-add'
    serializer_class = DogRatingSerializer
    queryset = DogRating.objects.all()


class GetDogRating(APIView):
    name = 'dog-rating-get'

    def get(self, request, pk):
        try:
            dog = Dog.objects.get(id=pk)
            ratings = DogRating.objects.filter(dog=dog)
            rating = ratings.aggregate(Avg('value'))['value__avg']
            return Response({'rating': rating})
        except Dog.DoesNotExist:
            return Response({'error': 'Pies nie znaleziony.'}, status=404)


class AddTrainerRating(CreateAPIView):
    name = 'trainer-rating-add'
    serializer_class = TrainerRatingSerializer
    queryset = TrainerRating.objects.all()


class GetTrainerRating(APIView):
    name = 'trainer-rating-get'

    def get(self, request, pk):
        try:
            trainer = CustomUser.objects.get(id=pk, is_trainer=True)
            ratings = TrainerRating.objects.filter(trainer=trainer)
            rating = ratings.aggregate(Avg('value'))['value__avg']
            return Response({'rating': rating})
        except CustomUser.DoesNotExist:
            return Response({'error': 'Trener nie znaleziony.'}, status=404)


class TrainerWalksList(ListAPIView):
    name = 'trainer-walks'
    serializer_class = SlotSerializer

    def get_queryset(self):
        return Slot.objects.filter(
            trainer=self.kwargs['pk'],
            date=datetime.date.today(),
            end_time__gte=datetime.datetime.now(),
            start_time__lte=datetime.datetime.now() + datetime.timedelta(hours=1),
        ).distinct()


class DogReviews(ListAPIView):
    name = 'dog-walk-reviews'
    serializer_class = DogRatingSerializer

    def get_queryset(self):
        return DogRating.objects.filter(dog=self.kwargs['pk'])


class DogFromWalkReview(RetrieveAPIView):
    name = 'dog-walk-review'
    serializer_class = DogRatingSerializer

    def get_queryset(self):
        return DogRating.objects.filter(dog=self.kwargs['pk'])

# widok z listą opinii, które trener wystawił psom
# widok z listą opinii, które użytkownik wystawił trenerowi
