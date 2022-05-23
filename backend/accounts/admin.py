# Django
from django.contrib import admin
from django.contrib.auth import get_user_model

User = get_user_model()
# Local
from .models import UserAddress


@admin.register(User)
class UserAdmin(admin.ModelAdmin):  # noqa: D101
    """User admin."""

    list_display = (
        'email',
        'is_staff',
    )

@admin.register(UserAddress)
class UserAddressAdmin(admin.ModelAdmin):
    pass