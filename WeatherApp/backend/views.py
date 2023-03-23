from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse, HttpResponseRedirect
import requests
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer,FavouriteSerializer
from rest_framework import status
from .models import Favourite

from dotenv import load_dotenv
import os
load_dotenv()  # take environment variables from .env.

APIKEY = os.environ.get('APIKEY')


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['name'] = user.name

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



##User registration view
@api_view(['POST'])
def register(request):
    data = request.data
    try:
        user = User.objects.create_user(username=data['username'],email=data['email'],password=data['password'])
        user.save()
    except:
        content = "These credenatials already exists"
        return Response(content,status=status.HTTP_409_CONFLICT)
    serializer = UserSerializer(user)
    return Response(serializer.data)


#View for getting city list by name information
@api_view(['GET'])
def getCity(request,city):
    if request.method == 'GET':
        url = 'http://api.openweathermap.org/geo/1.0/direct?q={}&limit=5&appid={}'
        response = requests.get(url.format(city,APIKEY)).json()
        if not response:
            content = {"No Matcing City"}
            return Response(content,status = status.HTTP_404_NOT_FOUND)
        city_weather = []
        for key in response:
            key['local_names']={}
            city_weather.append(key)
        return Response(city_weather,status = status.HTTP_200_OK)

#view for getting City weather information using precise latitude and longitude
@api_view(['GET'])
def data(request):
    if request.method=='GET':
        lat = request.GET.get('lat',None)
        lon = request.GET.get('lon',None)
        url = 'https://api.openweathermap.org/data/2.5/weather?lat={}&lon={}&appid={}'
        response = requests.get(url.format(lat,lon,APIKEY)).json()
        if not response:
            content = {"No Matcing City"}
            return Response(content,status = status.HTTP_404_NOT_FOUND)
        return Response(response,status=status.HTTP_200_OK)   


#View for fetching forcast data for five days
@api_view(['GET'])
def daily(request):
    lat = request.GET.get('lat',None)
    lon = request.GET.get('lon',None)
    url = 'https://api.openweathermap.org/data/3.0/onecall?lat={}&lon={}&exclude=current,minutely,hourly,alerts&appid={}'
    response = requests.get(url.format(lat,lon,APIKEY)).json()
    if not response:
        content = {"Something wrong with api call"}
        return Response(content,status=status.HTTP_404_NOT_FOUND)
    return Response(response,status=status.HTTP_200_OK) 



#View for dealinf with adding city name to favourites and removing from favourites
@api_view(['POST','DELETE'])
@permission_classes([IsAuthenticated])
def like(request):
    if request.method == "POST":
        data = request.data
        user = request.user
        name = data['name']
        lat = data['lat']
        lon = data['lon']
        try:
            favourite = Favourite(user=user,name=name,lat=lat,lon=lon)
            favourite.save()
        except:
            content = {"error in liking this place"}
            return Response(content,status=status.HTTP_403_FORBIDDEN)
        content = {"success ok"}
        return Response(content,status=status.HTTP_200_OK)
    
    elif request.method == "DELETE":
        user = request.user
        name = request.GET.get('name',None)
        lat = request.GET.get('lat',None)
        lon = request.GET.get('lon',None)
        content = {"success ok"}
        try:
            obj = Favourite.objects.filter(user = user,name=name,lat=lat,lon=lon)
            obj.delete()
        except:
            content = {"delete forbidden"}
            Response(content,status=status.HTTP_403_FORBIDDEN)
        return Response(content, status = status.HTTP_200_OK)
    


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def favourite(request):
    favourites = Favourite.objects.filter(user=request.user)
    serializer = FavouriteSerializer(favourites,many=True)

    return Response(serializer.data,status=status.HTTP_200_OK)
