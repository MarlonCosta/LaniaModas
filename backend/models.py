import datetime
from decimal import Decimal

from django.db import models


# Create your models here.
class Cliente(models.Model):
    id: int = models.AutoField(primary_key=True)
    cpf: str = models.CharField(unique=True, max_length=11, null=False, verbose_name="CPF",
                                error_messages={'unique': "CPF já cadastrado"})
    nome: str = models.CharField(max_length=30, null=False)
    sobrenome: str = models.CharField(max_length=30, null=False)
    apelido: str = models.CharField(max_length=30)
    debito: Decimal = models.DecimalField(default=0.00, max_digits=10, decimal_places=2, null=False)
    ultima_compra = models.DateTimeField(null=True)
    ultimo_pagamento = models.DateTimeField(null=True)
    data_cadastro = models.DateField(auto_now_add=True, null=False)
    telefone = models.CharField(max_length=11)
    email = models.EmailField(max_length=254, null=True)
    instagram = models.CharField(max_length=30, null=True)
    endereco = models.CharField(max_length=120, null=False)
    score = models.IntegerField(default=0, null=False)

    def __str__(self):
        return f"{self.nome} {self.sobrenome}"


class Produto(models.Model):
    CATEGORIAS = (
        ('CAMISETA', 'Camiseta'),
        ('CALCA', 'Calça'),
        ('BLUSA', 'Blusa'),
        ('VESTIDO', 'Vestido'),
        ('SAIA', 'Saia'),
        ('SHORT', 'Short'),
        ('JAQUETA', 'Jaqueta'),
        ('CASACO', 'Casaco'),
        ('BONE', 'Boné'),
        ('MEIA', 'Meia'),
        ('COSMETICO', 'Cosmético'),
        ('ACESSORIO', 'Acessório'),
        ('OUTROS', 'Outros'),
    )

    GENERO = (
        ('MASCULINO', 'Masculino'),
        ('FEMININO', 'Feminino'),
        ('UNISEX', 'Unissex'),
    )

    id: int = models.AutoField(primary_key=True)
    codigo: str = models.CharField(unique=True, max_length=10, null=False, verbose_name="Código",
                                   error_messages={'unique': "Código já cadastrado"})
    codigo_barras: str = models.CharField(unique=True, max_length=13, null=False, verbose_name="Código de barras",
                                          error_messages={'unique': "Código de barras já cadastrado"})
    descricao: str = models.CharField(max_length=30, null=False)
    cor: str = models.CharField(max_length=30, null=False)
    tamanho: str = models.CharField(max_length=5, null=False)
    categoria: str = models.CharField(max_length=30, null=False, choices=CATEGORIAS)
    preco_venda: Decimal = models.DecimalField(default=0.00, max_digits=10, decimal_places=2, null=False)
    preco_custo: Decimal = models.DecimalField(default=0.00, max_digits=10, decimal_places=2, null=False)
    estoque: int = models.IntegerField(default=0, null=False)
    data_cadastro = models.DateField(auto_now_add=True, null=False)
    genero = models.CharField(max_length=30, null=False, choices=GENERO)


class ProdutoVendido(models.Model):
    produto: Produto = models.ForeignKey(Produto, on_delete=models.CASCADE, null=False)
    quantidade_vendida: int = models.IntegerField(default=0, null=False)
    preco: Decimal = models.DecimalField(default=0.00, max_digits=10, decimal_places=2, null=False)
    desconto: Decimal = models.DecimalField(default=0.00, max_digits=10, decimal_places=2, null=False)

    def __str__(self):
        return f"{self.produto.descricao} - {self.quantidade_vendida} - {self.preco} - {self.desconto}"

    def calcular_preco_final(self):
        return self.quantidade_vendida * (self.preco - self.desconto)


class EventoFinanceiro(models.Model):
    TIPO_EVENTO_FINANCEIRO = (
        ('VENDA', 'Venda'),
        ('PAGAMENTO', 'Pagamento'),
    )

    id: int = models.AutoField(primary_key=True)
    cliente: Cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, null=False)
    valor_pago: Decimal = models.DecimalField(default=0.00, max_digits=10, decimal_places=2, null=False)
    valor_total: Decimal = models.DecimalField(default=0.00, max_digits=10, decimal_places=2, null=False)
    data_hora = models.DateTimeField(auto_now_add=True, null=False)
    produtos_vendidos = models.ManyToManyField(ProdutoVendido, related_name='produtos_vendidos', blank=True)
    tipo_evento = models.CharField(max_length=30, null=False, choices=TIPO_EVENTO_FINANCEIRO)

    def __str__(self):
        return f"{self.cliente} - {self.valor_pago} - {self.data_hora} - {self.tipo_evento}"

    def calcular_valor_total(self):
        return sum([produto.calcular_preco_final() for produto in self.produtos_vendidos.all()])

    def calcular_debito(self):
        return self.valor_total - self.valor_pago

    def concluir_venda(self):
        self.valor_total = self.calcular_valor_total()
        self.cliente.debito += self.calcular_debito()
        self.save()


def calcular_fechamento_caixa():
    return sum([evento.valor for evento in
                EventoCaixa.objects.filter(tipo_evento='ABERTURA', data_hora__day=datetime.date.today())]) + \
           sum([evento.valor for evento in
                EventoCaixa.objects.filter(tipo_evento='REFORCO', data_hora__day=datetime.date.today())]) - \
           sum([evento.valor for evento in
                EventoCaixa.objects.filter(tipo_evento='SANGRIA', data_hora__day=datetime.date.today())]) + \
           sum([venda.valor for venda in
                EventoFinanceiro.objects.filter(tipo_evento='VENDA', data_hora__day=datetime.date.today())])


class EventoCaixa(models.Model):
    TIPO_EVENTO_CAIXA = (
        ('ABERTURA', 'Abertura'),
        ('FECHAMENTO', 'Fechamento'),
        ('SANGRIA', 'Sangria'),
        ('REFORCO', 'Reforço'),
    )

    id: int = models.AutoField(primary_key=True)
    valor: Decimal = models.DecimalField(default=0.00, max_digits=10, decimal_places=2, null=False)
    data_hora = models.DateTimeField(auto_now_add=True, null=False)
    tipo_evento = models.CharField(max_length=30, null=False, choices=TIPO_EVENTO_CAIXA)

    def __str__(self):
        return f"{self.valor} - {self.data_hora} - {self.tipo_evento}"

    def abrir_caixa(self, valor):
        self.tipo_evento = 'ABERTURA'
        self.valor = valor
        self.save()

    def fechar_caixa(self):
        self.tipo_evento = 'FECHAMENTO'
        self.valor = calcular_fechamento_caixa()
        self.save()

    def sangria(self, valor):
        self.tipo_evento = 'SANGRIA'
        self.valor = valor
        self.save()

    def reforco(self, valor):
        self.tipo_evento = 'REFORCO'
        self.valor = valor
        self.save()
