# -*- coding: utf-8 -*-
from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Zadatak, Projekat, User, Kategorija, Komentar
from .serializers import (
    ZadatakSerializer, UserSerializer, ProjekatSerializer, 
    KategorijaSerializer, KomentarSerializer
)

# ViewSet za Zadatke
class ZadatakViewSet(viewsets.ModelViewSet):
    queryset = Zadatak.objects.all()
    serializer_class = ZadatakSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAuthenticated()]
        return [AllowAny()]

# ViewSet za Projekte
class ProjekatViewSet(viewsets.ModelViewSet):
    queryset = Projekat.objects.all()
    serializer_class = ProjekatSerializer
    permission_classes = [IsAuthenticated] # Samo ulogovani vide projekte

# ViewSet za Kategorije
class KategorijaViewSet(viewsets.ModelViewSet):
    queryset = Kategorija.objects.all()
    serializer_class = KategorijaSerializer
    permission_classes = [AllowAny]

# ViewSet za Komentare
class KomentarViewSet(viewsets.ModelViewSet):
    queryset = Komentar.objects.all()
    serializer_class = KomentarSerializer
    permission_classes = [IsAuthenticated]

# View za Registraciju
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer