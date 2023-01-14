import {Cliente} from "../Clientes";
import {useState} from "react";

interface Alert {
    message: string;
    client: Cliente;
    type: string;
}

export default function Alertas() {

    const [alerts, setAlerts] = useState<Alert[]>([
        {
            message: "Fazem 90 dias que fulana não paga",
            client: {
                id: 1,
                nome: "Fulana",
                sobrenome: "da Silva",
                apelido: "Fulana",
                cpf: "123.456.789-00",
                debito: 0,
                score: 0,
                ultimaCompra: "2021-01-01",
                ultimoPagamento: "2021-01-01",
                endereco: "Rua das Flores, 123",
                telefone: "(11) 1234-5678",
                email: "fulana@gmail.com",
            },
            type: "warning",
        }
    ])

    return (
        <div className="alert-list">
            {alerts.map((alert) => (
                <div className="alert-tile">
                    <div className="alert-message">
                        <p>{alert.message}</p>
                    </div>
                    <div className="alert-client">
                        <p>{alert.client.nome}</p>
                    </div>
                    <div className="alert-type">
                        <p>{alert.type}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
