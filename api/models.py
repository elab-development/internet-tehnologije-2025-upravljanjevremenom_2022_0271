# -*- coding: utf-8 -*-
from django.db import models
from django.contrib.auth.models import AbstractUser

#Model za korisnika
class User(AbstractUser):
    ROLE_CHOICES = (
        ('ADMIN', 'Admin'),
        ('MANAGER', 'Menadzer'),
        ('WORKER', 'Radnik'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='WORKER')

    class Meta:
        verbose_name = "Korisnik"
        verbose_name_plural = "Korisnici"

#Model za projekat
class Projekat(models.Model):
    naziv = models.CharField(max_length=100)
    opis = models.TextField()
    budzet = models.FloatField(default=0.0)
    zavrsen = models.BooleanField(default=False) 

    class Meta:
        verbose_name = "Projekat"
        verbose_name_plural = "Projekti"

#Model za kategorije
class Kategorija(models.Model):
    naziv = models.CharField(max_length=50)

    class Meta:
        verbose_name = "Kategorija"
        verbose_name_plural = "Kategorije"

#Model za zadatak
class Zadatak(models.Model):
    naslov = models.CharField(max_length=100)
    projekat = models.ForeignKey(Projekat, on_delete=models.CASCADE)
    dodijeljen_korisniku = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    kategorija = models.ForeignKey(Kategorija, on_delete=models.SET_NULL, null=True)
    prioritet = models.CharField(max_length=20, default='Srednji')

    class Meta:
        verbose_name = "Zadatak"
        verbose_name_plural = "Zadaci"

#Model za komentar
class Komentar(models.Model):
    tekst = models.TextField()
    zadatak = models.ForeignKey(Zadatak, on_delete=models.CASCADE)
    vreme_objave = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Komentar"
        verbose_name_plural = "Komentari"