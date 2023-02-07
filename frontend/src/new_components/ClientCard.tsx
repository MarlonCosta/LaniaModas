import React from 'react';
import OperationButton from './OperationButton';
import {FaHandHoldingUsd, FaShoppingCart} from "react-icons/all";
import './ClientCard.css';
import './Table.css';

export interface Client {
    id: number;
    firstName: string;
    lastName: string;
    nickname: string;
    address: string;
    city: string;
    phone: string;
    instagram: string;
    debt: number;
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
                                          firstName,
                                          lastName,
                                          nickname,
                                          address,
                                          city,
                                          phone,
                                          instagram,
                                          debt,
                                          transactions
                                      }) => {
    return (
        <div className="client-card">
            <div className="client-card-info">
                <h1>{firstName} {lastName} ({nickname})</h1>
                <div className="client-card-info-row">
                    <p>{address}</p>
                    <p>{phone}</p>
                </div>
                <div className="client-card-info-row">

                    <p>{city}</p>
                    <p>{instagram}</p>
                </div>
                <div className="client-card-info-row">
                    <p className="saldo-devedor">
                        Saldo devedor: R$ {debt.toFixed(2)}
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
                {transactions.map(transaction => (
                    <tr key={transaction.id}>
                        <td>{transaction.date}</td>
                        <td>{transaction.amount.toFixed(2)}</td>
                        <td>{transaction.type}</td>
                        <td>{transaction.paymentMethod}</td>
                    </tr>
                ))}
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
