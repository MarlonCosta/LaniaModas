import 'react';

import SearchCard from "./SearchCard";
import ClientCard from "./ClientCard";
import './ClientsPage.css';

export default function ClientsPage() {
    return (
        <div className="client-page">
            <SearchCard/>
            <ClientCard/>
        </div>
    )
}
