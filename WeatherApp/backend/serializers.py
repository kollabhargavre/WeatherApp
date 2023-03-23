from rest_framework.serializers import ModelSerializer

from .models import User, Favourite

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['email','username','id']

class FavouriteSerializer(ModelSerializer):
    user = UserSerializer(many=False,read_only=True)
    class Meta:
        model = Favourite
        fields = '__all__'