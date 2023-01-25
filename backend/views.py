import datetime

from django.utils import timezone
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from backend.models import Cliente, Produto, EventoCaixa
from backend.serializers import ClienteSerializer, ProdutoSerializer, EventoCaixaSerializer


# Create your views here.
class ClienteView(viewsets.ModelViewSet):
    serializer_class = ClienteSerializer
    queryset = Cliente.objects.all()


class ProdutoView(viewsets.ModelViewSet):
    serializer_class = ProdutoSerializer
    queryset = Produto.objects.all()


class EventoCaixaView(viewsets.ModelViewSet):
    serializer_class = EventoCaixaSerializer

    @action(detail=False, methods=['post'])
    def registrar_evento_caixa(self, request):
        tipo_evento = request.data['tipo_evento']
        EventoCaixa.objects.create(tipo_evento=tipo_evento, data_evento=datetime.datetime.now(tz=timezone.utc))

        return Response({'message': 'Evento registrado com sucesso!'})
