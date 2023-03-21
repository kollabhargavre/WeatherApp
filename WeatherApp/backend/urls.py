from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from . import views

urlpatterns = [
 
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("register/", views.register,name="register"),
    path("data/",views.data, name="weather_data" ),
    path("hourly/",views.hourly,name="hourly data"),
    path("fivedays/",views.getfivedays, name="fivedays forcast")

]