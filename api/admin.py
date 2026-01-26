from django.contrib import admin
from .models import User, Projekat, Kategorija, Zadatak, Komentar

admin.site.register(User)
admin.site.register(Projekat)
admin.site.register(Kategorija)
admin.site.register(Zadatak)
admin.site.register(Komentar)