from django.contrib import admin
from .models import Dog, Walk


@admin.register(Dog)
class DogADmin(admin.ModelAdmin):
    list_display = (
        'name',
        'breed',
        'owner',
    )


@admin.register(Walk)
class WalkAdmin(admin.ModelAdmin):
    list_display = (
        'date',
        'trainer',
    )
