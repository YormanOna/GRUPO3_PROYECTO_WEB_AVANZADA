from django.db import models

# Create your models here.
class Coctail(models.Model):
    nombre = models.CharField(max_length=100)
    tipo = models.CharField(max_length=100)
    cantidad = models.IntegerField()
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
    
class Clientes(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    fecha_nacimiento = models.DateField()
    cedula = models.IntegerField()
    domicilio = models.CharField(max_length=200)
    telefono = models.IntegerField()
    email = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre
    
class CuentaCliente(models.Model):
    nombreUsuario = models.CharField(max_length=100)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.nombreUsuario

    