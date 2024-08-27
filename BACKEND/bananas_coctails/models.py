from django.db import models

# Create your models here.
class Coctail(models.Model):
    nombre = models.CharField(max_length=100)
    tipo = models.CharField(max_length=100)
    cantidad = models.IntegerField()
    precio = models.IntegerField(default=0)
    garnishes = models.CharField(max_length=100)
    mixers = models.CharField(max_length=100)
    imagen = models.ImageField(upload_to='coctails', null=True, blank=True)

    def __str__(self):
        return self.nombre
    
class Paquetes(models.Model):
    nombrePaquete = models.CharField(max_length=150)
    numeroCocteles = models.IntegerField()
    precio = models.IntegerField()
    insumos = models.CharField(max_length=200)
    numeroPersonas = models.IntegerField()
    descripcion = models.CharField(max_length=200)

    def __str__(self):
        return self.nombrePaquete
    
from django.db import models

class Clientes(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    fecha_nacimiento = models.DateField()
    cedula = models.IntegerField()
    domicilio = models.CharField(max_length=200)
    telefono = models.IntegerField()
    email = models.EmailField(max_length=100)
    user = models.CharField(max_length=100)  # Nuevo campo 'user'
    password = models.CharField(max_length=100)  # Nuevo campo 'password'

    def __str__(self):
        return self.nombre

class CuentaCliente(models.Model):
    nombreUsuario = models.CharField(max_length=100)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.nombreUsuario

class Reserva(models.Model):
    servicio = models.CharField(max_length=50)  # Tipo de servicio, como "Bartender" o "Catering"
    fecha = models.DateTimeField()  # Fecha y hora del evento
    direccion = models.CharField(max_length=255)  # Dirección del evento
    cocteles = models.TextField()  # Almacena los detalles de los cócteles como texto JSON o en formato simplificado
    costo_estimado = models.DecimalField(max_digits=10, decimal_places=2)  # Costo total estimado

    def __str__(self):
        return f"Reserva para {self.servicio} en {self.fecha}"

    