from rest_framework import serializers

from backend.models import Cliente, Produto


class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = ['id', 'cpf', 'nome', 'sobrenome', 'apelido', 'debito', 'telefone', 'instagram', 'endereco', 'score', 'email']


class ProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = ['id', 'codigo', 'codigo_barras', 'descricao', 'cor', 'tamanho', 'categoria', 'preco_venda',
                  'preco_custo', 'estoque']
