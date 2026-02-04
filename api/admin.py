# -*- coding: utf-8 -*-
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Projekat, Kategorija, Zadatak, Komentar

# Registracija Custom User modela
class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ['username', 'email', 'role', 'is_staff']
    fieldsets = UserAdmin.fieldsets + (
        ('Dodatne informacije', {'fields': ('role',)}),
    )

admin.site.register(User, CustomUserAdmin)

# Administracija za Projekte
@admin.register(Projekat)
class ProjekatAdmin(admin.ModelAdmin):
    list_display = ('naziv', 'budzet', 'zavrsen')
    list_filter = ('zavrsen',)
    search_fields = ('naziv',)

# Administracija za Zadatke
@admin.register(Zadatak)
class ZadatakAdmin(admin.ModelAdmin):
    list_display = ('naslov', 'projekat', 'dodijeljen_korisniku', 'kategorija', 'prioritet')
    list_filter = ('prioritet', 'kategorija', 'projekat')
    search_fields = ('naslov',)

# Osnovna registracija za ostale modele
admin.site.register(Kategorija)
admin.site.register(Komentar)