import {useEffect, useState} from "react"
import axios from "axios";
import {FaPlus} from "react-icons/fa";
import NewClientModal from "../components/NewClientModal";
import EditClientModal from "../components/EditClientModal";

export interface Cliente {
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
    const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState<Cliente>({
        id: -1,
        nome: '',
        sobrenome: '',
        apelido: '',
        cpf: '',
        debito: 0,
        score: 0,
        ultimaCompra: '',
        ultimoPagamento: '',
        endereco: '',
        telefone: '',
        email: ''
    });


    useEffect(() => {
        axios.get(apiUrl)
            .then(response => setClients(response.data)) // update the clients state variable with the fetched data
    }, [])

    const handleClientCreation = (newClient: Cliente) => {
        axios.post(apiUrl, newClient)
            .then(response => {
                const updatedClients = [...clients, response.data];
                setClients(updatedClients);
            });
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const handleClientEdit = (client: Cliente) => {
        axios.put(apiUrl + client.id + '/', client)
            .then(response => {
                const updatedClients = [...clients];
                const index = updatedClients.findIndex(c => c.id === client.id);
                updatedClients[index] = response.data;
                setClients(updatedClients);
            });
    }

    const handleClientDeletion = (id: number) => {
        console.log("deleting client with id: " + id);
        axios.delete(apiUrl + id + '/')
            .then(() => {
                const updatedClients = clients.filter(c => c.id !== id);
                setClients(updatedClients);
            });
    }

    const handleTableRowClick = (client: Cliente) => {
        console.log("clicked on client with id: ", client);
        if (client) {
            setSelectedClient(client);
            setEditModalIsOpen(true);
        }
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
                    <tr key={client.id} onClick={() => handleTableRowClick(client)}>
                        <td>{client.nome} {client.sobrenome} ({client.apelido})</td>
                        <td>R$ {client.debito}</td>
                        <td style={{color: paintScore(client.score)}}>{client.score}</td>
                        <td>{client.ultimaCompra}</td>
                        <td style={{color: paintLastPayment(new Date(client.ultimoPagamento), client.debito)}}>{client.ultimoPagamento}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button className="add-button" onClick={() => setCreateModalIsOpen(true)}><FaPlus/></button>
            <NewClientModal
                isOpen={createModalIsOpen}
                onClose={() => setCreateModalIsOpen(false)}
                onSave={handleClientCreation}
            />
            <EditClientModal
                isOpen={editModalIsOpen}
                onClose={() => setEditModalIsOpen(false)}
                onSave={handleClientEdit}
                client={selectedClient}
                onDelete={handleClientDeletion}
            />
        </div>
    )
}
