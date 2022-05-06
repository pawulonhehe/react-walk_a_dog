from re import T
from django.db import models

from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.utils import timezone
from django.core.validators import RegexValidator
from django.utils.translation import ugettext_lazy as _


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """Create and save a user with the given email and
        password.
        """
        if not email:
            raise ValueError('The given email must be set')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must have is_staff=True.'
            )
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must have is_superuser=True.'
            )

        return self._create_user(email, password, **extra_fields)


class UserAddress(models.Model):
    city = models.CharField(
        'Miasto',
        max_length=40,
    )
    postal_code = models.CharField(
        'Kod pocztowy',
        max_length=6,
        validators=[
            RegexValidator(
                regex='^\d{2}-\d{3}$',
                message='Kod pocztowy musi być w formacie XX-XXX',
            ),
        ]
    )
    street = models.CharField(
        'Ulica',
        max_length=100,
    )
    house_number = models.CharField(
        'Numer domu',
        max_length=10,
    )
    flat_number = models.CharField(
        'Numer mieszkania',
        max_length=10,
        blank=True,
    )

    class Meta:
        verbose_name = 'Adres'
        verbose_name_plural = 'Adresy'


class UserDetails(models.Model):
    address = models.ForeignKey(
        UserAddress,
        verbose_name='Adres',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
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

    class Meta:
        verbose_name = 'Dane użytkownika'
        verbose_name_plural = 'Dane użytkowników'

    def __str__(self):
        return str(self.pk)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    details = models.ForeignKey(
        UserDetails,
        verbose_name='Dane użytkownika',
        on_delete=models.CASCADE,
        null=True,
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
            'this admin site.'
        ),
    )
    is_active = models.BooleanField(
        _('active'),
        default=True,
        help_text=_(
            'Designates whether this user should be '
            'treated as active. Unselect this instead '
            'of deleting accounts.'
        ),
    )
    date_joined = models.DateTimeField(
        _('date joined'),
        default=timezone.now,
    )

    objects = UserManager()

    USERNAME_FIELD = 'email'

    class Meta:
        verbose_name = 'Użytkownik'
        verbose_name_plural = 'Użytkownicy'
