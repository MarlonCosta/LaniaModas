import {createRoot} from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
} from "react-router-dom";

import "./index.css";
import SideBar from "./components/SideBar";
import Clientes from "./pages/Clientes";
import Home from "./pages/Home";
import ClientCard from "./new_components/ClientCard";
import Vendas from "./pages/Vendas";
import Produtos from "./pages/Produtos";
import ClientsPage from "./new_components/ClientsPage";

const AppLayout = () => (
    <>
        {/*<SideBar />*/}
        <Outlet/>
    </>
);


const router = createBrowserRouter([
    {
        element: <AppLayout/>,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "/clientes",
                element: <ClientsPage/>,
            },
            {
                path: "/vendas",
                element: <Vendas/>,
            },
            {
                path: "/produtos",
                element: <Produtos/>,
            }
        ],
    },
]);

createRoot(document.getElementById('root') as HTMLElement).render(
    <RouterProvider router={router}/>
);
