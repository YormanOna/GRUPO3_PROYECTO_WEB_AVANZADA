from rest_framework import viewsets
from .serializer import CoctailSerializer, PaquetesSerializer, ClientesSerializer, CuentaClienteSerializer
from .models import Coctail, Paquetes, Clientes, CuentaCliente

from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

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


@csrf_exempt
def send_email(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data['email']
            subject = data['subject']
            message = data['message']

            full_message = f"De: {email}\n\nMensaje:\n{message}"

            send_mail(
                subject,
                full_message,
                'onayorman@gmail.com',  
                ['onayorman@gmail.com'],  
                fail_silently=False,
            )
            return JsonResponse({'message': 'Email sent successfully'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid HTTP method'}, status=400)