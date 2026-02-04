# -*- coding: utf-8 -*-
from rest_framework import viewsets, permissions, status, generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Zadatak, Projekat, User
from .serializers import ZadatakSerializer, UserSerializer

# ViewSet za zadatke
class ZadatakViewSet(viewsets.ModelViewSet):
    queryset = Zadatak.objects.all()
    serializer_class = ZadatakSerializer

    # Pristup samo autentifikovanim korisnicima za izmene
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAuthenticated()]
        return [AllowAny()]

# View za Registraciju (Auth rute)
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

# --- POPRAVLJENA FUNKCIJA ZA PROFIL ---
@api_view(['GET'])
@authentication_classes([JWTAuthentication])  # Ovo kaže Đangu da koristi tvoj Token
@permission_classes([IsAuthenticated])
def get_my_profile(request):
    """
    Ova funkcija uzima ulogovanog korisnika i salje njegove podatke React-u.
    """
    user = request.user
    return Response({
        'id': user.id,
        'username': user.username,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email
    })