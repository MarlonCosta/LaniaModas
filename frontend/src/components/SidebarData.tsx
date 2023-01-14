import { BsFillFileEarmarkPersonFill } from "react-icons/bs";
import { FaHome, FaCashRegister } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <FaHome />,
    cName: "nav-text",
  },
  {
    title: "Clientes",
    path: "/clientes",
    icon: <BsFillFileEarmarkPersonFill />,
    cName: "nav-text",
  },
  {
    title: "Produtos",
    path: "/produtos",
    icon: <GiClothes />,
    cName: "nav-text",
  },
  {
    title: "Vendas",
    path: "/vendas",
    icon: <FaCashRegister />,
    cName: "nav-text",
  }
];
