from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse, HttpResponseRedirect
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
def data(request):
    return Response("hi")

@api_view(['GET'])
def hourly(request):
    return Response('hourly')


@api_view(['GET'])
def getfivedays(request):
    return Response("fivedays")