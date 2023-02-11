import 'react';

import ClientCard from "./ClientCard";
import {Client} from "./ClientCard"
import './ClientsPage.css';
import './SearchCard.css';
import React, {useEffect, useState} from "react";
import axios from "axios";


interface ClientListProps {
    clients: Client[];
    selectedClient: Client | null;
    onSelect: (client: Client) => void;
}

const ClientList: React.FC<ClientListProps> = ({clients, selectedClient, onSelect}) => {

    return (
        <div className="search-results">
            {clients.map(client => (
                <div key={client.id} className={`search-tile ${selectedClient === client ? 'selected' : ''}`}
                     onClick={() => onSelect(client)}>
                    <p>{client.nome} {client.sobrenome} ({client.apelido})</p>
                </div>
            ))}
        </div>
    )
}

export default function ClientsPage() {
    const apiUrl = "http://127.0.0.1:8000/api/clientes/";
    const [clients, setClients] = useState<Client[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [filteredClients, setFilteredClients] = useState<Client[]>([]);

    // fetch the clients from the API and update the client list when the page loads for the first time
    useEffect(() => {
        axios.get(apiUrl)
            .then(response => {
                setClients(response.data);
                setFilteredClients(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    // update the filtered clients when the search term changes
    useEffect(() => {
        handleSearch(searchTerm)
    }, [searchTerm]);


// filter the clients based on the search term
    const handleSearch = (searchTerm: string) => {
        setFilteredClients(
            clients.filter(
                client =>
                    client.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    client.sobrenome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    client.apelido.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    };

// update the selected client when a client is selected
    const handleClientSelect = (client: Client) => {
        setSelectedClient(client);
    };

// update the search term when the search bar is changed
    const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="client-page">
            <div className="search-page">
                <div className="search-bar">
                    <input type="text" value={searchTerm} onChange={handleSearchTermChange}/>
                </div>
                <ClientList clients={filteredClients} selectedClient={selectedClient} onSelect={handleClientSelect}/>
            </div>
            {selectedClient ? (<ClientCard
                id={selectedClient.id}
                nome={selectedClient.nome}
                sobrenome={selectedClient.sobrenome}
                apelido={selectedClient.apelido}
                endereco={selectedClient.endereco}
                cidade={selectedClient.cidade}
                telefone={selectedClient.telefone}
                instagram={selectedClient.instagram}
                debito={selectedClient.debito}
                transactions={selectedClient.transactions ? selectedClient.transactions : []}/>) : (
                <div className="client-card empty">
                    <p>Sem cliente selecionado</p>
                </div>
            )}
        </div>
    )
}
