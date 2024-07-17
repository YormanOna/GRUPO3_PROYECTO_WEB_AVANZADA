from rest_framework import viewsets
from .serializer import CoctailSerializer, PaquetesSerializer, ClientesSerializer, CuentaClienteSerializer
from .models import Coctail, Paquetes, Clientes, CuentaCliente

# Create your views here.
class CoctailViewSet(viewsets.ModelViewSet):
    queryset = Coctail.objects.all()
    serializer_class = CoctailSerializer

class PaquetesViewSet(viewsets.ModelViewSet):
    queryset = Paquetes.objects.all()
    serializer_class = PaquetesSerializer

class ClientesViewSet(viewsets.ModelViewSet):
    queryset = Clientes.objects.all()
    serializer_class = ClientesSerializer

class CuentaClienteViewSet(viewsets.ModelViewSet):
    queryset = CuentaCliente.objects.all()
    serializer_class = CuentaClienteSerializer
