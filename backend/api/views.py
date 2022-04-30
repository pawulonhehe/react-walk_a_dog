from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter


class UserDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @staticmethod
    def get(request, *args, **kwargs):
        return Response({'email': request.user.email})
