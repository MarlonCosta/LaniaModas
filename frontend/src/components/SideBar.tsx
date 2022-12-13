import {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import "./SideBar.css";
import {SidebarData} from "./SidebarData";

export default function SideBar() {
    const [activeButton, setActiveButton] = useState(0);

    useEffect(() => {
        const persistedActiveButton = localStorage.getItem('activeButton');
        if (persistedActiveButton) {
            setActiveButton(parseInt(persistedActiveButton, 10));
        }
    }, []);

    const handleActiveButton = (index: number) => {
        setActiveButton(index);
        localStorage.setItem('activeButton', String(index));
    }
    
    return (
        <div className="sidebar">
            <ul className="sidebar-list">
                {SidebarData.map((item, index) => {
                    return (
                        <li key={index} className={`${item.cName} ${activeButton === index ? "active" : "inactive"}`}
                            onClick={() => handleActiveButton(index)}>
                            <Link to={item.path}>
                                {item.icon}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
