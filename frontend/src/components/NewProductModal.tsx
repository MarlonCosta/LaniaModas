import {useState} from "react"
import Modal from 'react-modal';
import './NewClientModal.css';
import {AiFillCheckCircle, AiOutlineClose} from "react-icons/all";

interface NovoProduto {
    codigo: string;
    codigo_barras: string;
    descricao: string;
    categoria: string;
    cor: string;
    tamanho: string;
    preco_venda: number;
    preco_compra: number;
    quantidade_estoque: number;
}

// define the NewClientModal component to represent the modal
export default function NewClientModal(props: any) {
    // get the onSave and onClose callback functions and the isOpen prop
    // from the props passed to the NewSaleModal component
    const {onSave, onClose, isOpen} = props;

    // define the newProduct state variable to hold the values of the
    // new sale that is being created in the modal
    const [newProduct, setNewProduct] = useState<NovoProduto>({
        codigo: '0',
        codigo_barras: '012312',
        descricao: '',
        categoria: '',
        cor: '',
        tamanho: '',
        preco_venda: 0,
        preco_compra: 0,
        quantidade_estoque: 0
    });

    // define the handleChange function to update the newProduct state
    // variable when the user changes the values of the form fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setNewProduct({...newProduct, [name]: value});
    }

    // define the handleSave function to call the onSave callback
    // function and pass the newProduct as an argument when the user
    // clicks the save button in the modal
    const handleSave = () => {
        onSave(newProduct);
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
               contentLabel="Cadastro de Produto"
        >
            <div className="modal-header">
                <h2>Cadastrar cliente</h2>
            </div>
            <form>
                <div className="div1">
                    <label htmlFor="codigo">Código</label>
                    <input type="text" id="codigo" name="codigo" onChange={handleChange}
                           required={true}/>
                </div>
                <div className="div2">
                    <label htmlFor="codigobarras">Código de barras</label>
                    <input type="text" id="codigobarras" name="codigobarras" onChange={handleChange}
                           required={true}/>
                </div>
                <div className="div3">
                    <label htmlFor="description">Descrição</label>
                    <input type="text" id="description" name="description" onChange={handleChange}
                          required={true}/>
                </div>
                <div className="div4">
                    <label htmlFor="color">Cor</label>
                    <input type="text" id="color" name="color" onChange={handleChange}
                           required={true}/>
                </div>
                <div className="div5">
                    <label htmlFor="size">Tamanho</label>
                    <input type="text" id="size" name="size" onChange={handleChange}
                           required={true}/>
                </div>
                <div className="div6">
                    <label htmlFor="purchasePrice">Preço de compra</label>
                    <input type="number" id="purchasePrice" name="purchasePrice" onChange={handleChange}
                           required={true}/>
                </div>
                <div className="div7">
                    <label htmlFor="sellingPrice">Preço de venda</label>
                    <input type="number" id="sellingPrice" name="sellingPrice" onChange={handleChange}
                          required={true}/>
                </div>
                <div className="div8">
                    <label htmlFor="stockQuantity">Quantidade em estoque</label>
                    <input type="number" id="stockQuantity" name="stockQuantity" onChange={handleChange}
                           required={true}/>
                </div>
                <div className="div9">
                    <button className="salvar" onClick={handleSave}>Salvar</button>
                </div>
            </form>
            <button className="cancelar" onClick={handleClose}><AiOutlineClose size={25}/></button>
        </Modal>
    );
}
