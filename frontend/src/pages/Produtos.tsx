import {useState} from "react"
import NewProductModal from "../components/NewProductModal";

import axios from "axios";
import {FaPlus} from "react-icons/fa";

export interface Produto {
    codigo: string,
    codigo_barras: string,
    descricao: string,
    categoria: string,
    cor: string,
    tamanho: string,
    preco_venda: number,
    quantidade_estoque: number,
}


export default function Produtos() {
    // initialize the state variables
    const apiUrl = "http://127.0.0.1:8000/api/clientes/"

    const [products, setProducts] = useState<Produto[]>([])
    const [search, setSearch] = useState('')
    const [cor, setCor] = useState<string>('')
    const [tamanho, setTamanho] = useState<string>('')
    const [sellingPrice, setSellingPrice] = useState<number>(0)
    const [stockQuantity, setStockQuantity] = useState<number>(0)
    const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Produto>({
        codigo: '',
        codigo_barras: '',
        descricao: '',
        categoria: '',
        cor: '',
        tamanho: '',
        preco_venda: 0,
        quantidade_estoque: 0
    })

    // define the handleFilterChange function
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {id, value} = e.target;

        switch (id) {
            case 'busca':
                setSearch(value);
                break;
            case 'cor':
                setCor(value);
                break;
            case 'tamanho':
                setTamanho(value);
                break;

            default:
                // do nothing if the field is not recognized
                break;
        }
    }

    const handleProductCreation = (newProduct: Produto) => {
        axios.post(apiUrl, newProduct)
            .then(response => {
                const updatedProducts = [...products, response.data];
                setProducts(updatedProducts);
            });
    }

    const handleProductUpdate = (updatedProduct: Produto) => {
        axios.put(apiUrl + updatedProduct.codigo, updatedProduct)
            .then(() => {
                const updatedProducts = products.map(product => {
                    if (product.codigo === updatedProduct.codigo) {
                        return updatedProduct;
                    }
                    return product;
                });
                setProducts(updatedProducts);
            });
    }

    const handleProductDeletion = (deletedProduct: Produto) => {
        axios.delete(apiUrl + deletedProduct.codigo)
            .then(() => {
                const updatedProducts = products.filter(product => {
                    return product.codigo !== deletedProduct.codigo;
                });
                setProducts(updatedProducts);
            });
    }

    // filter the products using the state variables
    const filteredProducts = products.filter(produto => {
        return (
            //search by codigo, codigo_barras, descricao
            produto.codigo.toLowerCase().includes(search.toLowerCase()) ||
            produto.codigo_barras.toLowerCase().includes(search.toLowerCase()) ||
            produto.descricao.toLowerCase().includes(search.toLowerCase()) ||

            // filter by cor
            (cor === 'all' || produto.cor.toLowerCase() === cor) &&

            // filter by tamanho
            (tamanho === 'all' || produto.tamanho.toLowerCase() === tamanho)
        );
    });

    return (
        <div className="content">
            <h1>Produtos</h1>
            <div className="filters">
                <input type="text" id="busca" placeholder="Buscar por código, código de barras ou descrição" onChange={handleFilterChange}
                       className="filter-item"/>
                <div className="filter-item">
                    <select name="cor" id="cor" onChange={handleFilterChange}>
                        <option value="all">Cor</option>
                        <option value="vermelho">Vermelho</option>
                        <option value="azul">Azul</option>
                        <option value="verde">Verde</option>
                    </select>
                </div>
                <div className="filter-item">
                    <select name="categoria" id="categoria" onChange={handleFilterChange}>
                        <option value="all">Categoria</option>
                      <option value="Camiseta">Camiseta</option>
                      <option value="Calça">Calça</option>
                        <option value="Vestido">Vestido</option>
                        <option value="Saia">Saia</option>
                        <option value="Shorts">Shorts</option>
                        <option value="Jaqueta">Jaqueta</option>
                        <option value="Casaco">Casaco</option>
                        <option value="Boné">Boné</option>
                        <option value="Meia">Meia</option>
                        <option value="Cosmético">Cosmético</option>
                        <option value="Acessório">Acessório</option>
                        <option value="Outros">Outros</option>
                    </select>
                </div>
                <div className="filter-item">
                    <select name="size" id="size" onChange={handleFilterChange}>
                        <option value="all">Tamanho</option>
                        <option value="PP">PP</option>
                        <option value="P">P</option>
                        <option value="M">M</option>
                        <option value="G">G</option>
                        <option value="GG">GG</option>
                        <option value="XG">XG</option>
                        <option value="XGG">XGG</option>
                        <option value="Único>">Único</option>
                    </select>
                </div>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Código</th>
                    <th>Código de barras</th>
                    <th>Descrição</th>
                    <th>Cor</th>
                    <th>Tamanho</th>
                    <th>Valor</th>
                    <th>Quantidade em estoque</th>
                </tr>
                </thead>
                <tbody>
                {filteredProducts.map(product => (
                    <tr key={product.codigo}>
                        <td>{product.codigo}</td>
                        <td>{product.codigo_barras}</td>
                        <td>{product.descricao}</td>
                        <td>{product.cor}</td>
                        <td>{product.tamanho}</td>
                        <td>R$ {product.preco_venda.toFixed(2)}</td>
                        <td>{product.quantidade_estoque}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button className="add-button" onClick={() => setCreateModalIsOpen(true)}><FaPlus/></button>
            <NewProductModal
                isOpen={createModalIsOpen}
                onClose={() => setCreateModalIsOpen(false)}
                onSave={handleProductCreation}
            />
            <NewProductModal
                isOpen={editModalIsOpen}
                onClose={() => setEditModalIsOpen(false)}
                onSave={handleProductUpdate}
                client={selectedProduct}
                onDelete={handleProductDeletion}
            />
        </div>
    );
}
