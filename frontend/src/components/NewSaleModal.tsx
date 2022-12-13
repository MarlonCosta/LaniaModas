import { useState } from "react"
import { format, } from 'date-fns';
import Modal from 'react-modal';
import './Modals.css';

// define the NewSaleModal component to represent the modal
export default  function NewSaleModal(props: any) {
    // get the onSave and onClose callback functions and the isOpen prop
    // from the props passed to the NewSaleModal component
    const { onSave, onClose, isOpen } = props;

    // define the newSale state variable to hold the values of the
    // new sale that is being created in the modal
    const [newSale, setNewSale] = useState({
        clientName: '',
        value: 0,
        datetime: format(new Date(), 'yyyy-MM-dd\'T\'HH:mm'),
        discount: 0,
        saleswoman: '',
        paymentMethod: 'credit'
    });

    // define the handleChange function to update the newSale state
    // variable when the user changes the values of the form fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewSale({ ...newSale, [name]: value });
    }

    // define the handleSave function to call the onSave callback
    // function and pass the newSale as an argument when the user
    // clicks the save button in the modal
    const handleSave = () => {
        onSave(newSale);
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
            contentLabel="New Sale Modal"
        >
            <h2>Nova Venda</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="client-name">Nome do cliente</label>
                    <input type="text" id="client-name" name="clientName" onChange={handleChange} value={newSale.clientName} />
                </div>
                <div className="form-group">
                    <label htmlFor="value">Valor</label>
                    <input type="number" id="value" name="value" onChange={handleChange} value={newSale.value} />
                </div>
                <div className="form-group">
                    <label htmlFor="datetime">Data</label>
                    <input type="datetime-local" id="datetime" name="datetime" onChange={handleChange} value={newSale.datetime} />
                </div>
                <div className="form-group">
                    <label htmlFor="discount">Desconto</label>
                    <input type="number" id="discount" name="discount" onChange={handleChange} value={newSale.discount} />
                </div>
                <div className="form-group">
                    <label htmlFor="saleswoman">Vendedora</label>
                    <input type="text" id="saleswoman" name="saleswoman" onChange={handleChange} value={newSale.saleswoman} />
                </div>
                <div className="form-group">
                    <label htmlFor="payment-method">Forma de pagamento</label>
                    <select id="payment-method" name="paymentMethod" onChange={handleChange} value={newSale.paymentMethod}>
                        <option value="dinheiro">Dinheiro</option>
                        <option value="cartão de crédito">Cartão de crédito</option>
                        <option value="cartão de débito">Cartão de débito</option>
                        <option value="cheque">Cheque</option>
                    </select>
                </div>
            </form>
            <div className="modal-buttons">
                <button className="salvar" onClick={handleSave}>Salvar</button>
                <button className="cancelar" onClick={handleClose}>Fechar</button>
            </div>
        </Modal>
    );
}
