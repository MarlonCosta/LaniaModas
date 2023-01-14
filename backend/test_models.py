from unittest import TestCase

from backend.models import ProdutoVendido


class TestEventoFinanceiro(TestCase):
    def test_calcular_valor_total(self):
        self.fail()

    def test_calcular_debito(self):
        self.fail()

    def test_concluir_venda(self):
        self.fail()


class TestProdutoVendido(TestCase):
    produto_vendido = ProdutoVendido()

    def test_calcular_preco_final(self):
        self.produto_vendido.produto_id = 1
        self.produto_vendido.quantidade_vendida = 3
        self.produto_vendido.preco = 10
        self.produto_vendido.desconto = 0
        self.assertEqual(self.produto_vendido.calcular_preco_final(), 30)
