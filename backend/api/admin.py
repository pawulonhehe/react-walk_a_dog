"""Api admin file."""

# Django
from django.contrib import admin

# Local
from .models import Dog
from .models import DogRating
from .models import Slot
from .models import TrainerRating


@admin.register(Dog)
class DogAdmin(admin.ModelAdmin):  # noqa: D101
    list_display = (
        'name',
        'breed',
        'owner',
    )


@admin.register(Slot)
class SlotAdmin(admin.ModelAdmin):  # noqa: D101
    list_display = (
        'date',
        'dog_count',
    )


@admin.register(DogRating)
class DogRatingAdmin(admin.ModelAdmin):  # noqa: D101
    pass


@admin.register(TrainerRating)
class TrainerRatingAdmin(admin.ModelAdmin):  # noqa: D101
    pass
