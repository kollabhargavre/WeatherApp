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

class Favourite(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name="favourites")
    name = models.CharField(max_length=64)
    lat = models.FloatField()
    lon = models.FloatField()

    def __str__(self):
        return f"{self.name}-Lat-{self.lat}-Lon-{self.lon}"
