from django.contrib import admin
from django.contrib.auth import get_user_model

User = get_user_model()
from .models import UserAddress, UserDetails


@admin.register(User)
class UserAdmin(admin.ModelAdmin):  # noqa: D101
    """User admin."""

    list_display = (
        'email',
        'is_staff',
    )

@admin.register(UserDetails)
class UserDetailsAdmin(admin.ModelAdmin):
    pass

@admin.register(UserAddress)
class UserAddressAdmin(admin.ModelAdmin):
    pass