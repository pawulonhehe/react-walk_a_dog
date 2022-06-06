"""Api urls."""

# Django
from django.conf.urls import url
from django.urls import include
from django.urls import path

# 3rd-party
from allauth.account.views import confirm_email

# Local
from .views import CustomUserDetailView, DogInWalkAPIView
from .views import CustomUserListView
from .views import DogCreateView
from .views import DogDetailView
from .views import DogListView
from .views import SlotCountView
from .views import SlotCreateView
from .views import SlotDetailView
from .views import SlotListView
from .views import TrainerDetailView
from .views import TrainerListView
from .views import TrainerWalkHistory

# from .views import FacebookLogin
app_name = 'api'
urlpatterns = [
    # path('rest-auth/facebook/', FacebookLogin.as_view(), name='fb_login'),
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/register/', include('dj_rest_auth.registration.urls')),
    url(
        r"^auth/register/account-confirm-email/(?P<key>[\s\d\w().+-_',:&]+)/$",
        confirm_email,
        name='account_confirm_email',
    ),
    # users
    path(
        'users/',
        CustomUserListView.as_view(),
        name=CustomUserListView.name,
    ),
    path(
        'users/<int:pk>/',
        CustomUserDetailView.as_view(),
        name=CustomUserDetailView.name,
    ),
    # dogs
    path(
        'dogs/',
        DogListView.as_view(),
        name=DogListView.name,
    ),
    path(
        'dogs/<int:pk>/',
        DogDetailView.as_view(),
        name=DogDetailView.name,
    ),
    path(
        'dogs/create/',
        DogCreateView.as_view(),
        name=DogCreateView.name,
    ),
    # walks
    path(
        'walks/',
        SlotListView.as_view(),
        name=SlotListView.name,
    ),
    path(
        'walks/<int:pk>/',
        SlotDetailView.as_view(),
        name=SlotDetailView.name,
    ),
    path(
        'walks/new/',
        SlotCreateView.as_view(),
        name=SlotCreateView.name,
    ),
    # trainers
    path(
        'trainers/',
        TrainerListView.as_view(),
        name=TrainerListView.name,
    ),
    path(
        'trainers/<int:pk>/',
        TrainerDetailView.as_view(),
        name=TrainerDetailView.name,
    ),
    path(
        'trainers/<int:pk>/walk-history/',
        TrainerWalkHistory.as_view(),
        name=TrainerWalkHistory.name,
    ),
    path(
        'slots/<int:trainer_id>/',
        SlotCountView.as_view(),
        name=SlotCountView.name,
    ),
    path(
        'walks/active/<int:pk>/',
        DogInWalkAPIView.as_view(),
        name=DogInWalkAPIView.name,
         )
]
