import React from 'react';
import Table from './Table';
import OperationButton from './OperationButton';
import {FaHandHoldingUsd, FaShoppingCart} from "react-icons/all";
import './ClientCard.css';

const ClientCard = () => {
    const headers = ['Data e hora', 'Valor', 'Tipo', 'Pagamento'];
    const rows = [
        {row: ['22/01/2023 - 16:30', 100.0.toFixed(2), "Pagamento", "Crédito"], index: 1},
        {row: ['23/01/2023 - 11:22', 250.0.toFixed(2), "Venda", "Anotado"], index: 2},
    ];

    return (
        <div className="client-card">
            <div className="client-card-info">
                <h1>Fulana de Tal (Apelido)</h1>
                <div className="client-card-info-row">
                    <p>Rua dos bobos, 0</p>
                    <p>Telefone: (00) 00000-0000</p>
                </div>
                <div className="client-card-info-row">

                    <p>Congo - PB</p>
                    <p>@fufu_lana</p>
                </div>
                <div className="client-card-info-row">
                    <p className="saldo-devedor">
                        Saldo devedor: R$ 0,00
                    </p>
                </div>
            </div>

            <Table headers={headers} rows={rows}/>

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
