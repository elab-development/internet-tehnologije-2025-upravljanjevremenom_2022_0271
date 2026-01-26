from rest_framework import generics
from .models import Stranica, Blok
from .serializers import StranicaSerializer, BlokSerializer


class StranicaList(generics.ListCreateAPIView):
    queryset = Stranica.objects.all()
    serializer_class = StranicaSerializer

