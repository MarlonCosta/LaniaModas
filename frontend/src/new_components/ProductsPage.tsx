import 'react';

import './ProductsPage.css';
import './SearchCard.css';
import React, {useEffect, useState} from "react";

import axios from "axios";

interface Product {
    id: number;
    codigo: string;
    codigo_barras: string;
    descricao: string;
    cor: string;
    tamanho: string;
    categoria: string;
    preco_venda: number;
    preco_custo: number;
    estoque: number;
    data_cadastro: string;
    genero: string;
}

interface ProductListProps {
    products: Product[];
    selectedProduct: Product | null;
    onSelect: (product: Product) => void;
}

const ProductTable: React.FC<ProductListProps> = ({products, selectedProduct, onSelect}) => {
    return (
        <table className="products-table">
            <tr>
                <th>Código</th>
                <th>Descrição</th>
                <th>Preço</th>
                <th>Estoque</th>
                <th>Tamanho</th>
                <th>Cor</th>
                <th>Gênero</th>
            </tr>
            {products.map(product => (
                <tr key={product.id} className={`${selectedProduct === product ? 'selected' : ''}`}
                    onClick={() => onSelect(product)}>
                    <td>{product.codigo}</td>
                    <td>{product.descricao}</td>
                    <td>R$ {product.preco_venda.toFixed(2)}</td>
                    <td>{product.estoque}</td>
                    <td>{product.tamanho}</td>
                    <td>{product.cor}</td>
                    <td>{product.genero}</td>
                </tr>
            ))}
        </table>
    )
}

export default function ProductsPage() {
    const apiUrl = "http://127.0.0.1:8000/api/productos/";
    const [products, setProducts] = useState<Product[]>([
        {
            id: 1,
            codigo: "P001",
            codigo_barras: "1234456789",
            descricao: "Camisa Polo",
            cor: "Azul",
            tamanho: "M",
            categoria: "Vestuário",
            preco_venda: 59.99,
            preco_custo: 45.00,
            estoque: 20,
            data_cadastro: "2022-10-01",
            genero: "Masculino"
        }, {
            id: 2,
            codigo: "P002",
            codigo_barras: "9876543210",
            descricao: "Calça Jeans",
            cor: "Azul escuro",
            tamanho: "L",
            categoria: "Vestuário",
            preco_venda: 89.99,
            preco_custo: 65.00,
            estoque: 15,
            data_cadastro: "2022-11-02",
            genero: "Feminino"
        }, {
            id: 3,
            codigo: "P003",
            codigo_barras: "1112223333",
            descricao: "Tênis Confortável",
            cor: "Branco",
            tamanho: "40",
            categoria: "Calçados",
            preco_venda: 149.99,
            preco_custo: 110.00,
            estoque: 10,
            data_cadastro: "2022-12-03",
            genero: "Unissex"
        }]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [categorias, setCategoria] = useState<string>("");
    const [tamanho, setTamanho] = useState<string>("");
    const [genero, setGenero] = useState<string>("");
    const [cor, setCor] = useState<string>("");

    // fetch the products from the API and update the product list when the page loads for the first time
    useEffect(() => {
        axios.get(apiUrl)
            .then(response => {
                setProducts(response.data);
                setFilteredProducts(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    // update the filtered products when the search term changes
    useEffect(() => {
        handleSearch(searchTerm, categorias, tamanho, genero, cor)
    }, [searchTerm, categorias, tamanho, genero, cor]);


    // filter the products based on the search term
    const handleSearch = (searchTerm: string, categoria: string, tamanho: string, genero: string, cor: string) => {
        console.log("Busca feita com os termos: " + searchTerm + " " + categoria + " " + tamanho + " " + genero + " " + cor + "")
        setFilteredProducts(
            products.filter(
                product =>
                    product.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.codigo_barras.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.categoria === categoria || categoria === "TODOS" ||
                    product.tamanho.toLowerCase().includes(tamanho.toLowerCase()) || tamanho === "" ||
                    product.genero === genero || genero === "TODOS" ||
                    product.cor === cor || cor === "TODOS")
        );
    };

    // update the selected product when a product is selected
    const handleProductSelect = (product: Product) => {
        setSelectedProduct(product);
    };

    // update the search term when the search bar is changed
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        console.log("Campo alterado: " + e.target.id + " Valor: " + e.target.value);

        const {id, value} = e.target;

        switch (id) {
            case 'search-bar':
                setSearchTerm(value);
                break;
            case 'categoria':
                setCategoria(value);
                break;
            case 'genero':
                setGenero(value);
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

    return (
        <div className="product-page">
            <div className="search-filters">
                <div className="search-bar">
                    <input type="text" placeholder="Pesquisar" value={searchTerm} id="search-bar"
                           onChange={handleFilterChange}/>
                </div>
                <div className="filters">
                    <select name="categoria" id="categoria" className="filter" onChange={handleFilterChange}>
                        <option value="TODOS">Categoria</option>
                        <option value="CAMISETA">Camiseta</option>
                        <option value="CALCA">Calça</option>
                        <option value="BLUSA">Blusa</option>
                        <option value="VESTIDO">Vestido</option>
                        <option value="SAIA">Saia</option>
                        <option value="SHORT">Short</option>
                        <option value="JAQUETA">Jaqueta</option>
                        <option value="CASACO">Casaco</option>
                        <option value="BONE">Boné</option>
                        <option value="MEIA">Meia</option>
                        <option value="COSMETICO">Cosmético</option>
                        <option value="ACESSORIO">Acessório</option>
                        <option value="OUTROS">Outros</option>
                    </select>
                    <div className="tamanho">
                        <input type="text" placeholder="Tamanho" value={tamanho} id="tamanho"
                               onChange={handleFilterChange}/>
                    </div>
                    <select name="genero" id="genero" className="filter" onChange={handleFilterChange}>
                        <option value="TODOS">Gênero</option>
                        <option value="MASCULINO">Masculino</option>
                        <option value="FEMININO">Feminino</option>
                        <option value="UNISSEX">Unissex</option>
                    </select>
                    <select name="cor" id="cor" className="filter" onChange={handleFilterChange}>
                        <option value="TODOS">Cor</option>
                        <option value="BRANCO">Branco</option>
                        <option value="PRETO">Preto</option>
                        <option value="AZUL">Azul</option>
                        <option value="VERMELHO">Vermelho</option>
                        <option value="VERDE">Verde</option>
                        <option value="AMARELO">Amarelo</option>
                        <option value="LARANJA">Laranja</option>
                        <option value="ROSA">Rosa</option>
                        <option value="ROXO">Roxo</option>
                        <option value="MARROM">Marrom</option>
                        <option value="CINZA">Cinza</option>
                        <option value="OUTROS">Outros</option>
                    </select>
                </div>
            </div>
            <div className="product-table">
                <ProductTable products={filteredProducts} selectedProduct={selectedProduct}
                              onSelect={handleProductSelect}/>
            </div>
        </div>
    )
}
