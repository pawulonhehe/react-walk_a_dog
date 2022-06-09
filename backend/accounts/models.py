"""Accounts models."""

# Django
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.core.validators import MaxValueValidator
from django.core.validators import MinValueValidator
from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _


class UserManager(BaseUserManager):  # noqa: D101
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):  # noqa: D105
        """Create and save a user with the given email and password."""
        if not email:
            raise ValueError('The given email must be set')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):  # noqa: D102
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):  # noqa: D102
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must have is_staff=True.',
            )
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must have is_superuser=True.',
            )

        return self._create_user(email, password, **extra_fields)


class VisibleManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(hidden=False, deleted=False)


class CustomUser(AbstractBaseUser, PermissionsMixin):  # noqa: D101
    phone_number = models.CharField(
        'Numer telefonu',
        max_length=20,
        blank=True,
    )
    date_of_birth = models.DateField(
        'Data urodzenia',
        blank=True,
        null=True,
    )
    image = models.ImageField(
        'Zdjęcie profilowe',
        upload_to='profile_images',
        blank=True,
    )
    email = models.EmailField(
        unique=True,
        max_length=255,
        blank=False,
    )
    first_name = models.CharField(
        _('first name'),
        max_length=30,
        blank=True,
    )
    last_name = models.CharField(
        _('last name'),
        max_length=150,
        blank=True,
    )
    is_staff = models.BooleanField(
        _('staff status'),
        default=False,
        help_text=_(
            'Designates whether the user can log into '
            'this admin site.',
        ),
    )
    is_active = models.BooleanField(
        _('active'),
        default=True,
        help_text=_(
            'Designates whether this user should be '
            'treated as active. Unselect this instead '
            'of deleting accounts.',
        ),
    )
    date_joined = models.DateTimeField(
        _('date joined'),
        default=timezone.now,
    )
    is_trainer = models.BooleanField(
        'Trener',
        default=False,
    )

    objects = UserManager()

    USERNAME_FIELD = 'email'

    class Meta:  # noqa: D106
        verbose_name = 'Użytkownik'
        verbose_name_plural = 'Użytkownicy'

    def get_full_name(self):  # noqa: D102
        return f'{self.first_name} {self.last_name}'

    def __str__(self):  # noqa: D105
        return self.get_full_name()
