from allauth.account.views import confirm_email
from django.conf.urls import url
from django.urls import path, include
from .views import CustomUserDetailView, CustomUserListView, DogListView, DogDetailView, WalkDetailView, WalkListView
# from .views import FacebookLogin
app_name = 'api'
urlpatterns = [
    # path('rest-auth/facebook/', FacebookLogin.as_view(), name='fb_login'),
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/register/', include('dj_rest_auth.registration.urls')),
    url(
        r"^auth/register/account-confirm-email/(?P<key>[\s\d\w().+-_',:&]+)/$",
        confirm_email,
        name="account_confirm_email",
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
    # walks
    path(
        'walks/',
        WalkListView.as_view(),
        name=WalkListView.name,
    ),
    path(
        'walks/<int:pk>/',
        WalkDetailView.as_view(),
        name=WalkDetailView.name,
    ),
    # trainers
]
