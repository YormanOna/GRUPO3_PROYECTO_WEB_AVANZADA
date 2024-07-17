from django.urls import path, include
from rest_framework import routers
from bananas_coctails import views

router = routers.DefaultRouter()
router.register(r'coctails', views.CoctailViewSet,'coctails')
router.register(r'paquetes', views.PaquetesViewSet,'paquetes')
router.register(r'clientes', views.ClientesViewSet,'clientes')
router.register(r'cuentacliente', views.CuentaClienteViewSet,'cuentacliente')

urlpatterns = [
    path('api/info',include(router.urls)),
]