# Django
from django.contrib import admin

# Local
from .models import Dog
from .models import Slot


@admin.register(Dog)
class DogADmin(admin.ModelAdmin):
    list_display = (
        'name',
        'breed',
        'owner',
    )


@admin.register(Slot)
class SlotAdmin(admin.ModelAdmin):
    list_display = (
        'date',
    )
