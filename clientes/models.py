from decimal import Decimal

from django.db import models


# Create your models here.
class Cliente(models.Model):
    id: int = models.AutoField(primary_key=True)
    cpf: str = models.CharField(unique=True, max_length=11, null=False, verbose_name="CPF")
    nome: str = models.CharField(max_length=30, null=False)
    sobrenome: str = models.CharField(max_length=30, null=False)
    apelido: str = models.CharField(max_length=30)
    debito: Decimal = models.DecimalField(default=0.00, max_digits=10, decimal_places=2, null=False)
    ultima_compra = models.DateTimeField(null=True)
    ultimo_pagamento = models.DateTimeField(null=True)
    data_cadastro = models.DateField(auto_now_add=True, null=False)
    telefone = models.CharField(max_length=11)
    email = models.EmailField(max_length=254, null=True)
    endereco = models.CharField(max_length=120, null=False)
    score = models.IntegerField(default=0, null=False)

    def __str__(self):
        return f"{self.nome} {self.sobrenome}"
