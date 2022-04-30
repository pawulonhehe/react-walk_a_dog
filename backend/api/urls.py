from allauth.account.views import confirm_email
from django.conf.urls import url
from django.urls import path, include

# from .views import FacebookLogin
app_name = 'api'
urlpatterns = [
    # path('rest-auth/facebook/', FacebookLogin.as_view(), name='fb_login'),
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/register/', include('dj_rest_auth.registration.urls')),
    url(r"^auth/register/account-confirm-email/(?P<key>[\s\d\w().+-_',:&]+)/$", confirm_email,
        name="account_confirm_email"),
]
