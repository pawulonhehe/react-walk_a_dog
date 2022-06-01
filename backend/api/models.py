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
        on_delete=models.SET_NULL,
        default=None,
        null=True,
        related_name='dogs',
    )

    class Meta:
        verbose_name = 'Pies'
        verbose_name_plural = 'Psy'

    def __str__(self):
        return f'{self.name} - {self.owner}'


class Trainer(models.Model):
    user = models.OneToOneField(
        CustomUser,
        on_delete=models.CASCADE,
        primary_key=True,
    )

    class Meta:
        verbose_name = 'Trener'
        verbose_name_plural = 'Trenerzy'

    def __str__(self):
        return self.user.get_full_name()


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
        blank=True,
        default=None,
    )
    trainer = models.ForeignKey(
        CustomUser,
        verbose_name='Trener',
        on_delete=models.CASCADE,
        default=None,
    )
    dog_count = models.PositiveSmallIntegerField(
        'Liczba zapisanych psów',
        blank=True,
        default=0,
    )

    class Meta:
        verbose_name = 'Spacer'
        verbose_name_plural = 'Spacery'

    def __str__(self):
        return f'{self.date} {self.start_time}-{self.end_time}'
