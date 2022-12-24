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

    const handleChange = (property: string, value: string | number) => {
        setUpdatedClient({...updatedClient, [property]: value});
    };

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
                        onChange={(e) => handleChange("nome", e.target.value)}
                    />
                </div>
                <div className="div2">
                    <label>Sobrenome</label>
                    <input
                        type="text"
                        placeholder="Sobrenome"
                        value={updatedClient.sobrenome}
                        onChange={(e) => handleChange("sobrenome", e.target.value)}
                    />
                </div>
                <div className="div3">
                    <label>Apelido</label>
                    <input
                        type="text"
                        placeholder="Apelido"
                        value={updatedClient.apelido}
                        onChange={(e) => handleChange("apelido", e.target.value)}
                    />
                </div>
                <div className="div4">
                    <label>CPF</label>
                    <input
                        type="text"
                        placeholder="Telefone"
                        value={updatedClient.telefone}
                        onChange={(e) => handleChange("cpf", e.target.value)}
                    />
                </div>
                <div className="div5">
                    <label>Endereço</label>
                    <input
                        type="text"
                        placeholder="Endereço"
                        value={updatedClient.endereco}
                        onChange={(e) => handleChange("nome", e.target.value)}
                    />
                </div>
                <div className="div6">
                    <label>Email</label>
                    <input
                        type="text"
                        placeholder="Email"
                        value={updatedClient.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                    />
                </div>
                <div className="div7">
                    <label>CPF</label>
                    <input
                        type="text"
                        placeholder="CPF"
                        value={updatedClient.cpf}
                        onChange={(e) => handleChange("cpf", e.target.value)}
                    />
                </div>
                <div className="div8">
                    <label>Débito</label>
                    <input
                        type="number"
                        disabled={true}
                        placeholder="Débito"
                        value={updatedClient.debito}
                        onChange={(e) => handleChange("debito", e.target.value)}
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
