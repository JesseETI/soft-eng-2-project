from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

# Create your models here.
class CustomUserManager(BaseUserManager):

    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("User must have an email address")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
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

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    role = models.CharField(verbose_name="role", max_length=30, unique=False)

    def __str__(self):
        return self.email


class Medication(models.Model):
    name = models.CharField(verbose_name="name", max_length=60, unique=True)
    price = models.FloatField()

class Order(models.Model):
    #order class
    medications = models.ForeignKey(Medication, on_delete=models.CASCADE, related_name="Medications")


class Pharmacy(models.Model):
    name = models.CharField(verbose_name="name", max_length=60, unique=True)
    address = models.CharField(verbose_name="address", max_length=100)
    contact = models.CharField(verbose_name="contact", max_length=30)
    orders = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="Order")
