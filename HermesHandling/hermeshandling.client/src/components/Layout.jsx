import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import SideBar from "../components/SideBarAdminApp";
import '../assets/css/Layout.css';

const Layout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login', { replace: true });
        }
        // Si necesitas validar el token con el backend, puedes hacerlo aquí
    }, [navigate]);

    return (
        <div className="layout-container">
            <div className="sidebar-container">
                <SideBar />
            </div>
            <div className="content-container">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
