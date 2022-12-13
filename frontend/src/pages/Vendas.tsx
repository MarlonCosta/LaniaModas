import { useState } from "react"
import { format, isWithinInterval } from 'date-fns';
import { FaPlus } from "react-icons/fa";
import NewSaleModal from "../components/NewSaleModal";

export default function Vendas() {

    const [search, setSearch] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [saleswoman, setSaleswoman] = useState('all')
    const [paymentType, setPaymentType] = useState('all')
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [sales, setSales] = useState([
        {
            clientName: 'John Doe',
            value: 100.00,
            datetime: '2021-01-01',
            discount: 10,
            saleswoman: 'Maria',
            paymentMethod: 'credit'
        },
        {
            clientName: 'Marlon Costa',
            value: 50.00,
            datetime: '2020-01-01',
            discount: 5,
            saleswoman: 'Adriano',
            paymentMethod: 'debit'
        },
    ])

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;

        switch (id) {
            case 'search':
                setSearch(value);
                break;
            case 'start-date':
                setStartDate(value);
                break;
            case 'end-date':
                setEndDate(value);
                break;
            case 'saleswoman':
                setSaleswoman(value);
                break;
            case 'payment':
                setPaymentType(value);
                break;
            default:
                // do nothing if the field is not recognized
                break;
        }
    }

    const filteredSales = sales.filter(sale => {
        const saleDate = new Date(sale.datetime);
        const start = new Date(startDate);
        const end = new Date(endDate);

        // create a date range from the start and end dates
        const dateRange = {
            start,
            end
        };
        // by default, include all sales in the filtered list
        // filter the sales if the user has entered search criteria
        if (search !== '' || startDate !== '' || endDate !== '' || saleswoman !== 'all' || paymentType !== 'all') {
            // only include the sale if it matches all the search criteria
            return (
                // search by client name
                sale.clientName.toLowerCase().includes(search.toLowerCase()) &&
                // search by date range
                isWithinInterval(saleDate, dateRange) &&
                // search by saleswoman
                sale.saleswoman.toLowerCase() === saleswoman.toLowerCase() &&
                // search by payment type
                sale.paymentMethod.toLowerCase() === paymentType.toLowerCase()
            );
        }
    })

    return (
        <div className='content'>
            <h1>Vendas</h1>
            <div className="filters">
                <input type="text" id="search" placeholder="Buscar cliente por nome" onChange={handleFilterChange} className="search filter-item" />
                <div className="filter-item">
                    <label htmlFor="start-date">De</label>
                    <input type="date" id="start-date" onBlur={handleFilterChange} />
                </div>
                <div className="filter-item">
                    <label htmlFor="end-date" >Até</label>
                    <input type="date" id="end-date" onBlur={handleFilterChange} />
                </div>
                <div className="filter-item">
                    <select name="saleswoman" id="saleswoman" onChange={handleFilterChange}>
                        <option value="all">Vendedora</option>
                        <option value="maria">Maria</option>
                        <option value="adriano">Adriano</option>
                    </select>
                </div>
                <div className="filter-item">
                    <select name="payment" id="payment" onChange={handleFilterChange}>
                        <option value="all">Forma de pagamento</option>
                        <option value="credit">Crédito</option>
                        <option value="debit">Débito</option>
                        <option value="money">Dinheiro</option>
                    </select>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Valor</th>
                        <th>Data</th>
                        <th>Desconto</th>
                        <th>Vendedora</th>
                        <th>Forma de pagamento</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSales.map(sale => (
                        <tr key={sale.clientName}>
                            <td>{sale.clientName}</td>
                            <td>{sale.value.toFixed(2)}</td>
                            <td>{format(new Date(sale.datetime), 'dd/MM/yyyy')}</td>
                            <td>{sale.discount}%</td>
                            <td>{sale.saleswoman}</td>
                            <td>{sale.paymentMethod}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="add-button" onClick={() => setModalIsOpen(true)}><FaPlus /></button>
            <NewSaleModal
                isOpen={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
                onSave={(newSale: any) => {
                    setSales([...sales, newSale]);
                    setModalIsOpen(false);
                }} />
        </div>
    )
}
