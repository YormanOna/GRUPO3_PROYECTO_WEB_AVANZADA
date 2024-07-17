from django.db import models

# Create your models here.
class Coctail(models.Model):
    nombre = models.CharField(max_length=100)
    tipo = models.CharField(max_length=100)
    cantidad = models.IntegerField()
    garnishes = models.CharField(max_length=100)
    mixers = models.CharField(max_length=100)
class Paquetes(models.Model):
    nombrePaquete = models.CharField(max_length=150)
    numeroCocteles = models.IntegerField()
    precio = models.IntegerField()
    insumos = models.CharField(max_length=200)
    numeroPersonas = models.IntegerField()
    descripcion = models.CharField(max_length=200)
class Clientes(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    fecha_nacimiento = models.DateField()
    cedula = models.IntegerField()
    domicilio = models.CharField(max_length=200)
    telefono = models.IntegerField()
    email = models.EmailField()
class CuentaCliente(models.Model):
    nombreUsuario = models.CharField(max_length=100)
    password = models.CharField(max_length=100)

    