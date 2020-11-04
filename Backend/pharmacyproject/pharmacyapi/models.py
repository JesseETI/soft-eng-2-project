from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

# Create your models here.
class CustomUserManager(BaseUserManager):

    def create_user(self, email, password=None):

        if not email:
            raise ValueError("User must have an email address")

        user = self.model(
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password, **extra_fields):

        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):

    #fields
    username = None
    email = models.EmailField(verbose_name="email", max_length=60, unique=True)
    date_created = models.DateTimeField(verbose_name="Date joined", auto_now_add=True)
    last_login = models.DateTimeField(verbose_name="Last login", auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()


    def __str__(self):
        return self.email


class Medication(models.Model):
    name = models.CharField(verbose_name="name", max_length=60, unique=True)
    price = models.FloatField()

class Pharmacy(models.Model):
    name = models.CharField(verbose_name="name", max_length=60, unique=True)
    address = models.CharField(verbose_name="address", max_length=100)
    contact = models.CharField(verbose_name="contact", max_length=30)

class PrescriptonOrder(models.Model):
    prescriptionText = models.TextField(max_length=512, blank=True, null=True, verbose_name="prescription text")
    prescriptionImage = models.ImageField(upload_to="prescriptions/", null=True, blank=True)
    pharmacy = models.ForeignKey(Pharmacy, on_delete=models.CASCADE, verbose_name="prescription receiver")
    user = models.CharField(max_length=60, verbose_name="user's email")


