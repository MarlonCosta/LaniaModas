import { useState } from "react"

export default function Produtos() {
    // initialize the state variables
    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('all');
    const [size, setSize] = useState('all');
    const [minSales, setMinSales] = useState(0);

    // define the handleFilterChange function
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;

        switch (id) {
            case 'code':
                setCode(value);
                break;
            case 'description':
                setDescription(value);
                break;
            case 'color':
                setColor(value);
                break;
            case 'size':
                setSize(value);
                break;
            case 'min-sales':
                setMinSales(parseInt(value));
                break;
            default:
                // do nothing if the field is not recognized
                break;
        }
    }

    const products = [
        {
            code: 'P001',
            description: 'Product 1',
            color: 'Vermelho',
            size: 'P',
            purchasePrice: 10.00,
            sellingPrice: 20.00,
            stockQuantity: 10,
            sales: 3,
        },
        {
            code: 'P002',
            description: 'Product 2',
            color: 'Azul',
            size: 'M',
            purchasePrice: 10.00,
            sellingPrice: 20.00,
            stockQuantity: 10,
            sales: 5,
        }
    ];

    // filter the products using the state variables
    const filteredProducts = products.filter(product => {
        return (
            // filter by code
            product.code.toLowerCase().includes(code.toLowerCase()) &&

            // filter by description
            product.description.toLowerCase().includes(description.toLowerCase()) &&

            // filter by color
            (color === 'all' || product.color.toLowerCase() === color.toLowerCase()) &&

            // filter by size
            (size === 'all' || product.size.toLowerCase() === size.toLowerCase()) &&

            // filter by the minimum number of sales
            product.sales >= minSales
        );
    });

    return (
        <div className="content">
            <h1>Produtos</h1>
            <div className="filters">
                <input type="text" id="code" placeholder="Buscar por código" onChange={handleFilterChange} className="filter-item" />
                <input type="text" id="description" placeholder="Buscar por descrição" onChange={handleFilterChange} className="filter-item" />
                <div className="filter-item">
                    <select name="color" id="color" onChange={handleFilterChange}>
                        <option value="all">Cor</option>
                        <option value="vermelho">Vermelho</option>
                        <option value="azul">Azul</option>
                        <option value="verde">Verde</option>
                    </select>
                </div>
                <div className="filter-item">
                    <select name="size" id="size" onChange={handleFilterChange}>
                        <option value="all">Tamanho</option>
                        <option value="P">P</option>
                        <option value="M">M</option>
                        <option value="G">G</option>
                    </select>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Descrição</th>
                        <th>Cor</th>
                        <th>Tamanho</th>
                        <th>Preço de compra</th>
                        <th>Preço de venda</th>
                        <th>Quantidade em estoque</th>
                        <th>Vendas</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map(product => (
                        <tr key={product.code}>
                            <td>{product.code}</td>
                            <td>{product.description}</td>
                            <td>{product.color}</td>
                            <td>{product.size}</td>
                            <td>R$ {product.purchasePrice.toFixed(2)}</td>
                            <td>R$ {product.sellingPrice}</td>
                            <td>{product.stockQuantity}</td>
                            <td>{product.sales}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
