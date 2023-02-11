import React from 'react';
import OperationButton from './OperationButton';
import {FaHandHoldingUsd, FaShoppingCart} from "react-icons/all";
import './ClientCard.css';
import './Table.css';

export interface Client {
    id: number;
    nome: string;
    sobrenome: string;
    apelido: string;
    endereco: string;
    cidade: string;
    telefone: string;
    instagram: string;
    debito: number;
    transactions: Transaction[];
}

interface Transaction {
    id: number;
    type: 'payment' | 'order';
    amount: number;
    date: string;
    paymentMethod: string;
}

const ClientCard: React.FC<Client> = ({
                                          id,
                                          nome,
                                          sobrenome,
                                          apelido,
                                          endereco,
                                          cidade,
                                          telefone,
                                          instagram,
                                          debito,
                                          transactions
                                      }) => {
    return (
        <div className="client-card">
            <div className="client-card-info">
                <h1>{nome} {sobrenome} ({apelido})</h1>
                <div className="client-card-info-row">
                    <p>{endereco}</p>
                    <p>{telefone}</p>
                </div>
                <div className="client-card-info-row">

                    <p>{cidade}</p>
                    <p>{instagram}</p>
                </div>
                <div className="client-card-info-row">
                    <p className="saldo-devedor">
                        Saldo devedor: R$ {debito}
                    </p>
                </div>
            </div>

            <table>
                <thead>
                <tr>
                    <th>Data e Hora</th>
                    <th>Valor</th>
                    <th>Tipo</th>
                    <th>Pagamento</th>
                </tr>
                </thead>
                <tbody>
                {transactions.length > 0 ? transactions.map(transaction => (
                    <tr key={transaction.id}>
                        <td>{transaction.date}</td>
                        <td>{transaction.amount.toFixed(2)}</td>
                        <td>{transaction.type}</td>
                        <td>{transaction.paymentMethod}</td>
                    </tr>
                )) :
                    <tr>
                        <td colSpan={4}>Nenhuma transação encontrada</td>
                    </tr>
                }
                </tbody>
            </table>

            <div className="buttons-row">
                <OperationButton icon={<FaHandHoldingUsd/>} text={"Novo pagamento"} onClick={() => console.log("hi")}
                                 color="green"/>
                <OperationButton icon={<FaShoppingCart/>} text={"Nova venda"} onClick={() => console.log("hi")}
                                 color="blue"/>
            </div>
        </div>

    )

}
export default ClientCard;
