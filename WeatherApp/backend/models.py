from django.db import models
from django.contrib.auth.models import AbstractUser

from .managers import CustomUserManager


# Create your models here.
class User(AbstractUser):
    email = models.EmailField(verbose_name='email', unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = CustomUserManager()

    def __str__(self):
        return self.email