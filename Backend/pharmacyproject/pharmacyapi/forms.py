# accounts/forms.py
from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import User

class CustomUserCreationForm(UserCreationForm):

    class Meta:
        model = User
        fields = ('id', 'email', 'password')

class CustomUserChangeForm(UserChangeForm):

    class Meta:
        model = User
        fields = ('id', 'email', 'password')