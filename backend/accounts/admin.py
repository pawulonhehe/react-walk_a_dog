"""Accounts admin."""

# Django
from django.contrib import admin
from django.contrib.auth import get_user_model

# Project
from api.models import Trainer

# Local
from .models import UserAddress

User = get_user_model()
# Local


@admin.register(User)
class UserAdmin(admin.ModelAdmin):  # noqa: D101
    """User admin."""

    list_display = (
        'email',
        'is_staff',
    )


@admin.register(UserAddress)
class UserAddressAdmin(admin.ModelAdmin):  # noqa: D101
    pass


@admin.register(Trainer)
class TrainerAdmin(admin.ModelAdmin):  # noqa: D101
    pass
