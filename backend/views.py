from rest_framework import viewsets

from backend.models import Cliente, Produto
from backend.serializers import ClienteSerializer, ProdutoSerializer


# Create your views here.
class ClienteView(viewsets.ModelViewSet):
    serializer_class = ClienteSerializer
    queryset = Cliente.objects.all()


class ProdutoView(viewsets.ModelViewSet):
    serializer_class = ProdutoSerializer
    queryset = Produto.objects.all()
