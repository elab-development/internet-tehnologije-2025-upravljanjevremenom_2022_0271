from rest_framework import serializers
from .models import User, Projekat, Kategorija, Zadatak, Komentar

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        #Omogucavanjee kreiranje korisnika sa sifrom (za Register)
        user = User.objects.create_user(**validated_data)
        return user

class ProjekatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projekat
        fields = '__all__'

class ZadatakSerializer(serializers.ModelSerializer):
    class Meta:
        model = Zadatak
        fields = '__all__'

class KategorijaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Kategorija
        fields = '__all__'

class KomentarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Komentar
        fields = '__all__'