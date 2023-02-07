import 'react';

import ClientCard from "./ClientCard";
import {Client} from "./ClientCard"
import './ClientsPage.css';
import './SearchCard.css';
import React, {useEffect, useState} from "react";


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
                    <p>{client.firstName} {client.lastName} ({client.nickname})</p>
                </div>
            ))}
        </div>
    )
}

export default function ClientsPage() {
    const [clients, setClients] = useState<Client[]>([
        {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            nickname: "Johnny",
            address: "123 Main St, Anytown USA 12345",
            city: "Anytown",
            phone: "555-555-1234",
            instagram: "@johndoe",
            debt: 0,
            transactions: [
                {
                    id: 1,
                    type: "order",
                    amount: 100,
                    date: "2022-01-01",
                    paymentMethod: "cash"
                },
                {
                    id: 2,
                    type: "payment",
                    amount: 50,
                    date: "2022-01-02",
                    paymentMethod: "credit"
                },
                {
                    id: 3,
                    type: "order",
                    amount: 200,
                    date: "2022-01-03",
                    paymentMethod: "credit"
                }
            ]
        },
        {
            id: 2,
            firstName: "Jane",
            lastName: "Doe",
            nickname: "Janie",
            address: "456 Oak Ave, Anytown USA 12345",
            city: "Anytown",
            phone: "555-555-2345",
            instagram: "@janedoe",
            debt: 50,
            transactions: [
                {
                    id: 4,
                    type: "order",
                    amount: 75,
                    date: "2022-01-01",
                    paymentMethod: "credit"
                },
                {
                    id: 5,
                    type: "payment",
                    amount: 25,
                    date: "2022-01-03",
                    paymentMethod: "cash"
                }
            ]
        },
        {
            id: 3,
            firstName: "Bob",
            lastName: "Smith",
            nickname: "Bobby",
            address: "789 Pine St, Anytown USA 12345",
            city: "Anytown",
            phone: "555-555-3456",
            instagram: "@bobsmith",
            debt: 100,
            transactions: [
                {
                    id: 6,
                    type: "order",
                    amount: 125,
                    date: "2022-01-01",
                    paymentMethod: "cash"
                },
                {
                    id: 7,
                    type: "payment",
                    amount: 75,
                    date: "2022-01-02",
                    paymentMethod: "credit"
                }
            ]
        }
    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [filteredClients, setFilteredClients] = useState<Client[]>([]);

    useEffect(() => {
        handleSearch(searchTerm)
    }, [searchTerm]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };


    const handleSearch = (searchTerm: string) => {
        setFilteredClients(
            clients.filter(
                client =>
                    client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    client.nickname.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    };

    const handleClientSelect = (client: Client) => {
        setSelectedClient(client);
    };

    const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="client-page">
            <div className="search-page">
                <div className="search-bar">
                    <input type="text" value={searchTerm} onChange={handleChange}/>
                </div>
                <ClientList clients={filteredClients} selectedClient={selectedClient} onSelect={handleClientSelect}/>
            </div>
            {selectedClient ? (<ClientCard
                id={selectedClient.id}
                firstName={selectedClient.firstName}
                lastName={selectedClient.lastName}
                nickname={selectedClient.nickname}
                address={selectedClient.address}
                city={selectedClient.city}
                phone={selectedClient.phone}
                instagram={selectedClient.instagram}
                debt={selectedClient.debt}
                transactions={selectedClient.transactions}/>) : (
                <div className="client-card">
                    <p>No client selected</p>
                </div>
            )}

        </div>
    )
}
