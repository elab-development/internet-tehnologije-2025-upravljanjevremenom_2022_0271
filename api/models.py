from django.db import models
from django.contrib.auth.models import User

class Stranica(models.Model):
    naslov = models.CharField(max_length=255)
    korisnik = models.ForeignKey(User, on_delete=models.CASCADE)
    tagovi = models.TextField(blank=True, null=True)
    datum_izmena = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.naslov

class Blok(models.Model):
    stranica = models.ForeignKey(Stranica, on_delete=models.CASCADE)
    tip_bloka = models.CharField(max_length=50)
    sadrzaj = models.JSONField()
    redosled = models.IntegerField()

class Podsetnik(models.Model):
    blok = models.ForeignKey(Blok, on_delete=models.CASCADE)
    vreme_slanja = models.DateTimeField()
    status = models.CharField(max_length=20, default='aktivan')