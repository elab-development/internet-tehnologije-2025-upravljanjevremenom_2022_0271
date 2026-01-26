from django.contrib import admin
from django.urls import path
from api.views import StranicaList

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/stranice/', StranicaList.as_view()),
]