# Django
from django.db import models

# Project
from accounts.models import CustomUser


class Dog(models.Model):  # noqa: D101
    GENDER_CHOICES = (
        ('M', 'Samiec'),
        ('F', 'Samica'),
    )
    name = models.CharField(
        verbose_name='Nazwa',
        max_length=100,
    )
    breed = models.CharField(
        verbose_name='Rasa',
        max_length=100,
    )
    gender = models.CharField(
        verbose_name='Płeć',
        choices=GENDER_CHOICES,
        max_length=6,
    )
    weight = models.PositiveIntegerField('Waga')
    owner = models.ForeignKey(
        CustomUser,
        verbose_name='Właściciel',
        on_delete=models.CASCADE,
        default=None,
        related_name='dogs',
    )

    class Meta:
        verbose_name = 'Pies'
        verbose_name_plural = 'Psy'


class Slot(models.Model):
    date = models.DateField(verbose_name='Data')
    start_time = models.TimeField(verbose_name='Początek')
    end_time = models.TimeField(verbose_name='Koniec')
    location = models.DecimalField(
        verbose_name='Aktualna lokalizacja',
        max_digits=9,
        decimal_places=6,
    )
    dogs = models.ManyToManyField(
        Dog,
        verbose_name='Psy',
        max_length=3,
    )

    class Meta:
        verbose_name = 'Spacer'
        verbose_name_plural = 'Spacery'


class Trainer(models.Model):
    user = models.OneToOneField(
        CustomUser,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    slots = models.ManyToManyField(
        Slot,
        verbose_name='Spacery',
        related_name='trainers',
    )
