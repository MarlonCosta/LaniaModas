import {useEffect, useState} from "react"
import axios from "axios";
import {FaPlus} from "react-icons/fa";
import NewClientModal from "../components/NewClientModal";

interface Cliente {
    id: number;
    cpf: string;
    nome: string;
    sobrenome: string;
    apelido: string;
    debito: number;
    score: number;
    ultimaCompra: string;
    ultimoPagamento: string;
    endereco: string;
    telefone: string;
    email: string;
}


export default function Clientes() {
    const apiUrl = "http://127.0.0.1:8000/api/clientes/"
    const [search, setSearch] = useState('')
    const [clients, setClients] = useState<Cliente[]>([])
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        axios.get(apiUrl)
            .then(response => setClients(response.data)) // update the clients state variable with the fetched data
    }, [])

    const handleSubmit = (newClient: Cliente) => {
        axios.post(apiUrl, newClient)
            .then(response => {
                const updatedClients = [...clients, response.data];
                setClients(updatedClients);
            });
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const filteredClients = clients.filter(client => {
        return client.nome.toLowerCase().includes(search.toLowerCase())
            || client.sobrenome.toLowerCase().includes(search.toLowerCase())
            || client.apelido.toLowerCase().includes(search.toLowerCase())
    })


    function paintScore(score: number): string {
        if (score >= 70) {
            return "green"
        } else if (score >= 50) {
            return "yellow"
        } else {
            return "red"
        }
    }

    function paintLastPayment(lastPayment: Date, debt: number): string {
        const today = new Date()
        const difference = today.getTime() - lastPayment.getTime()
        const days = difference / (1000 * 3600 * 24)

        if (debt >= 100 && days >= 90) {
            return "red"
        } else {
            return "black"
        }
    }

    return (
        <div className="content">
            <h1>Clientes</h1>
            <div className="filters">
                <input type="text" placeholder="Buscar cliente por nome" onChange={handleSearch}
                       className="search filter-item"/>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Cliente</th>
                    <th>Débito</th>
                    <th>Score</th>
                    <th>Última compra</th>
                    <th>Último pagamento</th>
                </tr>
                </thead>
                <tbody>
                {filteredClients.map(client => (
                    <tr>
                        <td>{client.nome} {client.sobrenome} ({client.apelido})</td>
                        <td>R$ {client.debito}</td>
                        <td style={{color: paintScore(client.score)}}>{client.score}</td>
                        <td>{client.ultimaCompra}</td>
                        <td style={{color: paintLastPayment(new Date(client.ultimoPagamento), client.debito)}}>{client.ultimoPagamento}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button className="add-button" onClick={() => setModalIsOpen(true)}><FaPlus/></button>
            <NewClientModal
                isOpen={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
                onSave={handleSubmit}
                />
        </div>
    )
}
