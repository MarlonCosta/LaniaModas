from rest_framework import viewsets

from clientes.models import Cliente
from clientes.serializers import ClienteSerializer


# Create your views here.
class ClienteView(viewsets.ModelViewSet):
    serializer_class = ClienteSerializer
    queryset = Cliente.objects.all()
