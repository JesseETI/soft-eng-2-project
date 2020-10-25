from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self, email, title, fname, lname, password=None):

        if not email:
            raise ValueError("Teacher must have an email address")
        if not title:
            raise ValueError("Teacher must have an username")
        if not fname:
            raise ValueError("Teacher must have a first name")
        if not lname:
            raise ValueError("Teacher must have a last name")

        user = self.model(
            email=self.normalize_email(email),
            title=title,
            fname=fname,
            lname=lname,
        )

        user.set_password(password)
        user.save(using=self._db)

        return user


class User(AbstractBaseUser):

    #fields
    username = None
    date_created = models.DateTimeField(verbose_name="Date joined", auto_now_add=True)
    last_login = models.DateTimeField(verbose_name="Last login", auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    fname = models.CharField(verbose_name="First name", max_length=30)
    role = models.CharField(verbose_name="role", max_length=20)
    lname = models.CharField(verbose_name="Last name", max_length=40)
    email = models.EmailField(verbose_name="email", max_length=60, unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["fname", "lname", "role"]

    objects = UserManager()

    def __str__(self):
        return self.email + " " + self.title + " " + self.fname + " " + self.lname

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

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
