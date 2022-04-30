from django.urls import path

from api.views import UserDetailView
urlpatterns = [
    path('me/', UserDetailView.as_view(), name='user-details'),
]

