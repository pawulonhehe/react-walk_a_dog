"""Api models."""

# Django

# Django
from django.core.validators import MaxValueValidator
from django.core.validators import MinValueValidator
from django.db import models

# Project
from accounts.models import CustomUser


class Dog(models.Model):  # noqa: D101
    GENDER_CHOICES = (
        ('M', 'Samiec'),
        ('F', 'Samica'),
    )
    deleted = models.BooleanField(
        verbose_name='Usunięty',
        default=False,
        blank=True,
    )
    name = models.CharField(
        verbose_name='Nazwa',
        max_length=100,
        default='',
    )
    breed = models.CharField(
        verbose_name='Rasa',
        max_length=100,
        default='',
    )
    gender = models.CharField(
        verbose_name='Płeć',
        choices=GENDER_CHOICES,
        max_length=6,
        default='',
    )
    weight = models.PositiveIntegerField(
        verbose_name='Waga', default=0,
    )
    owner = models.ForeignKey(
        CustomUser,
        verbose_name='Właściciel',
        on_delete=models.SET_NULL,
        default=None,
        null=True,
        related_name='dogs',
    )
    image = models.ImageField(
        'Zdjęcie profilowe',
        upload_to='dog_images',
        blank=True,
        default='',
    )

    class Meta:  # noqa: D106
        verbose_name = 'Pies'
        verbose_name_plural = 'Psy'

    def __str__(self):  # noqa: D105
        return f'{self.name} - {self.owner}'


class TrainerRating(models.Model):  # noqa: D101
    value = models.FloatField(
        validators=[
            MinValueValidator(0.0),
            MaxValueValidator(5.0),
        ],
    )
    comment = models.TextField(
        verbose_name='Komentarz',
        blank=True,
        null=True,
        default='',
    )
    trainer = models.ForeignKey(
        CustomUser,
        verbose_name='Trener',
        on_delete=models.SET_NULL,
        related_name='trainer_ratings',
        null=True,
        default=None,
    )
    evaluator = models.ForeignKey(
        CustomUser,
        verbose_name='Oceniający',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )


class Slot(models.Model):  # noqa: D101
    finished = models.BooleanField(
        verbose_name='Zakończony',
        default=False,
        blank=True,
    )
    deleted = models.BooleanField(
        verbose_name='Usunięty',
        default=False,
        blank=True,
    )
    date = models.DateField(verbose_name='Data')
    start_time = models.TimeField(verbose_name='Początek')
    end_time = models.TimeField(verbose_name='Koniec')
    latitude = models.DecimalField(
        verbose_name='Szerokość',
        max_digits=9,
        decimal_places=6,
        default=0.0,
    )
    longitude = models.DecimalField(
        verbose_name='Długość',
        max_digits=9,
        decimal_places=6,
        default=0.0,
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
        on_delete=models.SET_NULL,
        default=None,
        null=True,
    )
    dog_count = models.PositiveSmallIntegerField(
        'Liczba zapisanych psów',
        blank=True,
        default=0,
    )

    class Meta:  # noqa: D106
        verbose_name = 'Spacer'
        verbose_name_plural = 'Spacery'

    def __str__(self):  # noqa: D105
        return f'{self.date} {self.start_time}-{self.end_time}'


class DogRating(models.Model):  # noqa: D101
    value = models.FloatField(
        validators=[
            MinValueValidator(0.0),
            MaxValueValidator(5.0),
        ],
    )
    comment = models.TextField(
        verbose_name='Komentarz',
        blank=True,
        null=True,
        default='',
    )
    walk = models.ForeignKey(
        Slot,
        verbose_name='Spacer',
        on_delete=models.SET_NULL,
        default=None,
        null=True,
    )
    dog = models.ForeignKey(
        Dog,
        verbose_name='Pies',
        on_delete=models.SET_NULL,
        related_name='ratings',
        null=True,
        default=None,

    )
    evaluator = models.ForeignKey(
        CustomUser,
        verbose_name='Oceniający',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    def __str__(self):
        return f'{self.dog} - {self.evaluator}'
