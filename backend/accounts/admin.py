from django.contrib import admin
from django.contrib.auth import get_user_model

# Register your models here.
User = get_user_model()


@admin.register(User)
class UserAdmin(admin.ModelAdmin):  # noqa: D101
    """User admin."""

    list_display = (
        'email',
        'is_staff',
    )
