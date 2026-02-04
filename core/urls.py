from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import ZadatakViewSet, RegisterView, get_my_profile  # Dodat get_my_profile
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'zadaci', ZadatakViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),

    # OVA LINIJA JE KLJUČNA DA "LUKA PERIĆ" PRORADI:
    path('api/user/me/', get_my_profile),

    # Auth rute (Login i Register)
    path('api/register/', RegisterView.as_view(), name='auth_register'),
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]