# -*- coding: utf-8 -*-
from rest_framework import viewsets, permissions, status, generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Zadatak, Projekat, User
from .serializers import ZadatakSerializer, UserSerializer

#ViewSet za zadatke
class ZadatakViewSet(viewsets.ModelViewSet):
    queryset = Zadatak.objects.all()
    serializer_class = ZadatakSerializer

    #Pristup samo autentifikovanim korisnicima za izmene
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAuthenticated()]
        return [AllowAny()]

#View za Registraciju (Auth rute)
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer