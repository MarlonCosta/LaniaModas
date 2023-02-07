import React, {useState} from "react";

interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({onSearch}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="search-bar">
            <input type="text" value={searchTerm} onChange={handleChange}/>
        </div>
    )
};
