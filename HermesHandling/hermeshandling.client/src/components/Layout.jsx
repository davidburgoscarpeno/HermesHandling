import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from "../components/SideBarAdminApp";
import '../assets/css/Layout.css'; // Aseg�rate que este CSS contenga los estilos que te pas�

const Layout = () => {
    return (
        <div className="layout-container">
            {/* Sidebar - ocupa el 20% del ancho */}
            <div className="sidebar-container">
                <SideBar />
            </div>

            {/* Contenido principal - ocupa el 80% */}
            <div className="content-container">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
