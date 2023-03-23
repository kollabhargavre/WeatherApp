from django.contrib import admin

# Register your models here.
from .models import User, Favourite

admin.site.register(User)
admin.site.register(Favourite)