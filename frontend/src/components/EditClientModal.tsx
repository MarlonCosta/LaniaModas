// EditClientModal component
import {useEffect, useState} from "react"
import {Cliente} from "../pages/Clientes"
import Modal from "react-modal"
import './EditClientModal.css'

export default function EditClientModal(props: {
    isOpen: boolean,
    onClose: () => void,
    client: Cliente,
    onSave: (updatedClient: Cliente) => void,
    onDelete: (id: number) => void
}) {
    const [updatedClient, setUpdatedClient] = useState<Cliente | null>(null)

    useEffect(() => {
        setUpdatedClient(props.client)
    }, [props.client])

    if (updatedClient === null) {
        return null
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target
        setUpdatedClient({...updatedClient, [name]: value})
    }

    return (
        <Modal className="modal"
               isOpen={props.isOpen}
               onRequestClose={props.onClose}>
            <div className="modal-header">
                <h2>Editar cliente</h2>
            </div>
            <form className="modal-body">
                <div className="div1">
                    <label>Nome</label>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={updatedClient.nome}
                        onChange={(e) => setUpdatedClient({...updatedClient, nome: e.target.value})}
                    />
                </div>
                <div className="div2">
                    <label>Sobrenome</label>
                    <input
                        type="text"
                        placeholder="Sobrenome"
                        value={updatedClient.sobrenome}
                        onChange={(e) => setUpdatedClient({...updatedClient, sobrenome: e.target.value})}
                    />
                </div>
                <div className="div3">
                    <label>Apelido</label>
                    <input
                        type="text"
                        placeholder="Apelido"
                        value={updatedClient.apelido}
                        onChange={(e) => setUpdatedClient({...updatedClient, apelido: e.target.value})}
                    />
                </div>
                <div className="div4">
                    <label>CPF</label>
                    <input
                        type="text"
                        placeholder="Telefone"
                        value={updatedClient.telefone}
                        onChange={(e) => setUpdatedClient({...updatedClient, telefone: e.target.value})}
                    />
                </div>
                <div className="div5">
                    <label>Endereço</label>
                    <input
                        type="text"
                        placeholder="Endereço"
                        value={updatedClient.endereco}
                        onChange={(e) => setUpdatedClient({...updatedClient, endereco: e.target.value})}
                    />
                </div>
                <div className="div6">
                    <label>Email</label>
                    <input
                        type="text"
                        placeholder="Email"
                        value={updatedClient.email}
                        onChange={(e) => setUpdatedClient({...updatedClient, email: e.target.value})}
                    />
                </div>
                <div className="div7">
                    <label>CPF</label>
                    <input
                        type="text"
                        placeholder="CPF"
                        value={updatedClient.cpf}
                        onChange={(e) => setUpdatedClient({...updatedClient, cpf: e.target.value})}
                    />
                </div>
                <div className="div8">
                    <label>Débito</label>
                    <input
                        type="number"
                        placeholder="Débito"
                        value={updatedClient.debito}
                        onChange={(e) => setUpdatedClient({...updatedClient, debito: Number(e.target.value)})}
                    />
                </div>
                <div className="div9">
                    <button type="submit" className="salvar" onClick={() => props.onSave(updatedClient)}>Salvar</button>
                </div>
                <div className="div10">
                    <button onClick={() => props.onDelete(updatedClient.id)} className="deletar">Excluir</button>
                </div>
            </form>
            <button className="cancelar" onClick={props.onClose}>X</button>
        </Modal>
    )
}
