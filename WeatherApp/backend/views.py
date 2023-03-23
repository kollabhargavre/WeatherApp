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
from .serializers import UserSerializer
from rest_framework import status



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['name'] = user.name

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


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


@api_view(['GET'])
def getCity(request,city):
    if request.method == 'GET':
        url = 'http://api.openweathermap.org/geo/1.0/direct?q={}&limit=5&appid=43a977d7984d9afc13b6dedb2d94400b'
        response = requests.get(url.format(city)).json()
        if not response:
            content = {"No Matcing City"}
            return Response(content,status = status.HTTP_404_NOT_FOUND)
        city_weather = []
        for key in response:
            key['local_names']={}
            city_weather.append(key)
        return Response(city_weather,status = status.HTTP_200_OK)


@api_view(['GET'])
def data(request):
    if request.method=='GET':
        lat = request.GET.get('lat',None)
        lon = request.GET.get('lon',None)
        url = 'https://api.openweathermap.org/data/2.5/weather?lat={}&lon={}&appid=43a977d7984d9afc13b6dedb2d94400b'
        response = requests.get(url.format(lat,lon)).json()
        if not response:
            content = {"No Matcing City"}
            return Response(content,status = status.HTTP_404_NOT_FOUND)
        return Response(response,status=status.HTTP_200_OK)   

@api_view(['GET'])
def daily(request):
    lat = request.GET.get('lat',None)
    lon = request.GET.get('lon',None)
    url = 'https://api.openweathermap.org/data/3.0/onecall?lat={}&lon={}&exclude=current,minutely,hourly,alerts&appid=43a977d7984d9afc13b6dedb2d94400b'
    response = requests.get(url.format(lat,lon)).json()
    if not response:
        content = {"Something wrong with api call"}
        return Response(content,status=status.HTTP_404_NOT_FOUND)
    return Response(response,status=status.HTTP_200_OK) 