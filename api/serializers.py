from rest_framework import serializers
from .models import Stranica, Blok

class StranicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stranica
        fields = '__all__'

class BlokSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blok
        fields = '__all__'