import {useState} from "react"
import Modal from 'react-modal';
import './NewClientModal.css';
import {AiFillCheckCircle, AiOutlineClose} from "react-icons/all";

interface NovoCliente {
    cpf: string;
    nome: string;
    sobrenome: string;
    apelido: string;
    debito: number;
    score: number;
    endereco: string;
    telefone: string;
    email: string;
}

// define the NewClientModal component to represent the modal
export default function NewClientModal(props: any) {
    // get the onSave and onClose callback functions and the isOpen prop
    // from the props passed to the NewSaleModal component
    const {onSave, onClose, isOpen} = props;

    // define the newClient state variable to hold the values of the
    // new sale that is being created in the modal
    const [newClient, setNewClient] = useState<NovoCliente>({
        nome: '',
        sobrenome: '',
        apelido: '',
        cpf: '',
        debito: 0,
        score: 0,
        endereco: '',
        telefone: '',
        email: ''
    });

    // define the handleChange function to update the newClient state
    // variable when the user changes the values of the form fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setNewClient({...newClient, [name]: value});
    }

    // define the handleSave function to call the onSave callback
    // function and pass the newClient as an argument when the user
    // clicks the save button in the modal
    const handleSave = () => {
        onSave(newClient);
    }

    // define the handleClose function to call the onClose callback
    // function when the user clicks the close button in the modal
    const handleClose = () => {
        onClose();
    }

    // render the modal
    return (
        <Modal className="modal"
               isOpen={isOpen}
               onRequestClose={handleClose}
               contentLabel="Cadastro de Cliente"
        >
            <div className="modal-header">
                <h2>Cadastrar cliente</h2>
            </div>
            <form>
                <div className="div1">
                    <label htmlFor="nome">Nome</label>
                    <input type="text" id="nome" name="nome" onChange={handleChange} value={newClient.nome}
                           required={true}/>
                </div>
                <div className="div2">
                    <label htmlFor="sobrenome">Sobrenome</label>
                    <input type="text" id="sobrenome" name="sobrenome" onChange={handleChange}
                           value={newClient.sobrenome} required={true}/>
                </div>
                <div className="div3">
                    <label htmlFor="apelido">Apelido</label>
                    <input type="text" id="apelido" name="apelido" onChange={handleChange} value={newClient.apelido}/>
                </div>
                <div className="div4">
                    <label htmlFor="endereco">Endereço</label>
                    <input type="text" id="endereco" name="endereco" onChange={handleChange}
                           value={newClient.endereco} required={true}/>
                </div>
                <div className="div5">
                    <label htmlFor="debito">Débito existente</label>
                    <input type="number" id="debito" name="debito" onChange={handleChange} value={newClient.debito}/>
                </div>

                <div className="div6">
                    <label htmlFor="cpf">CPF</label>
                    <input type="text" id="cpf" name="cpf" onChange={handleChange} value={newClient.cpf}/>
                </div>
                <div className="div7">
                    <label htmlFor="telefone">Telefone</label>
                    <input type="text" id="telefone" name="telefone" onChange={handleChange}
                           value={newClient.telefone}/>
                </div>
                <div className="div8">
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name="email" onChange={handleChange} value={newClient.email}/>
                </div>

                <div className="div9">
                    <button className="salvar" onClick={handleSave}>Salvar</button>
                </div>
            </form>
            <button className="cancelar" onClick={handleClose}><AiOutlineClose size={25}/></button>
        </Modal>
    );
}
