from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Description

class RegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'password')

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
        )

        user.set_password(validated_data['password'])

        user.save()

        return user
    
class DescriptionSerializer(serializers.Serializer):
    text = serializers.CharField(max_length=100)

    def create(self, validated_data):
        return Description.objects.create(**validated_data)