import 'react'

export default function SearchPage() {
    return (
        <div className="search-page">
            <div className="search-bar">
                <input type="text" placeholder="Pesquisar"/>
            </div>
            <div className="search-results">
                <div className="search-tile">
                    <p>Fulana de Tal (Apelido)</p>
                </div><div className="search-tile">
                    <p>Fulana de Tal Jr (Apelido)</p>
                </div><div className="search-tile">
                    <p>Fulana de Tal Neta (Apelido)</p>
                </div>
                <div className="search-tile">
                    <p>Cicrana de Tal (Apelido)</p>
                </div>
            </div>
        </div>
    )
}
