from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import (
    ZadatakViewSet, ProjekatViewSet, KategorijaViewSet, 
    KomentarViewSet, RegisterView
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'zadaci', ZadatakViewSet)
router.register(r'projekti', ProjekatViewSet)
router.register(r'kategorije', KategorijaViewSet)
router.register(r'komentari', KomentarViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    
    # Auth rute
    path('api/register/', RegisterView.as_view(), name='auth_register'),
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]