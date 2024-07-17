from rest_framework import serializers
from .models import Coctail, Paquetes, Clientes, CuentaCliente

class CoctailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coctail
        fields = '__all__'

class PaquetesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paquetes
        fields = '__all__'

class ClientesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clientes
        fields = '__all__'
    
class CuentaClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = CuentaCliente
        fields = '__all__'