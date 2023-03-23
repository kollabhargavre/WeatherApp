from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from . import views

urlpatterns = [
 
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("city/<str:city>", views.getCity,name="get city"),
    path("register/", views.register,name="register"),
    path("data/",views.data, name="weather_data" ),
    path("daily/",views.daily, name="daily forcast"),
    path("like/",views.like,name="like and dislike"),
    path("favourites/",views.favourite,name="favouites")

]