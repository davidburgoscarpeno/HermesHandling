import React, { useState } from "react";
import { Link } from "react-router-dom"; // Asegúrate de tener react-router-dom instalado
import 'bootstrap/dist/css/bootstrap.min.css'; // Si aún no lo tienes, necesitarás instalar Bootstrap
import "../assets/css/AdminApp/SideBarAdmin.css"; // Ruta del archivo CSS

const SidebarAdminCompany = () => {
    const [openMenu, setOpenMenu] = useState({
        dashboard: false,
        usuarios: false,
        configuracion: false,
        reports: false,
    });

    const toggleMenu = (menu) => {
        setOpenMenu((prevState) => ({
            ...prevState,
            [menu]: !prevState[menu],
        }));
    };

    return (
        <div className="sidebar-container">
            {/* Logo o nombre de la aplicación */}
            <div className="sidebar-header">
                <h3>Admin Panel</h3>
            </div>

            {/* Menú */}
            <div className="sidebar-menu">
                <ul className="nav flex-column">
                    {/* Dashboard */}
                    <li className="nav-item">
                        <Link to="/admin-app" className="nav-link text-white">
                           Dashboard
                        </Link>
                    </li>

                    {/* Usuarios */}
                    <li className="nav-item">
                        <button
                            className="nav-link text-white w-100 text-start btn-toggle"
                            onClick={() => toggleMenu("usuarios")}
                        >
                            Usuarios <i className={`bi bi-chevron-${openMenu.usuarios ? "down" : "right"}`}></i>
                        </button>
                        <div className={`submenu ${openMenu.usuarios ? "expanded" : ""}`}>
                            <ul className="nav flex-column ms-3">
                                <li className="nav-item">
                                    <Link to="/admin-app/usuarios/listar" className="nav-link text-white">
                                        Listar Usuarios
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/admin-app/usuarios/crear" className="nav-link text-white">
                                        Crear Usuario
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>

                    {/* Configuración */}
                    <li className="nav-item">
                        <button
                            className="nav-link text-white w-100 text-start btn-toggle"
                            onClick={() => toggleMenu("configuracion")}
                        >
                            Configuraci&oacute;n
                            <i className={`bi bi-chevron-${openMenu.configuracion ? "down" : "right"}`}></i>
                        </button>
                        <div className={`submenu ${openMenu.configuracion ? "expanded" : ""}`}>
                            <ul className="nav flex-column ms-3">
                                <li className="nav-item">
                                    <Link to="/admin-app/configuracion/ajustes" className="nav-link text-white">
                                        Ajustes Generales
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/admin-app/configuracion/seguridad" className="nav-link text-white">
                                        Seguridad
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>

                    {/* Reportes */}
                    <li className="nav-item">
                        <button
                            className="nav-link text-white w-100 text-start btn-toggle"
                            onClick={() => toggleMenu("reports")}
                        >
                            Reportes <i className={`bi bi-chevron-${openMenu.reports ? "down" : "right"}`}></i>
                        </button>
                        <div className={`submenu ${openMenu.reports ? "expanded" : ""}`}>
                            <ul className="nav flex-column ms-3">
                                <li className="nav-item">
                                    <Link to="/admin-app/reportes/generar" className="nav-link text-white">
                                        Generar Reporte
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/admin-app/reportes/consultar" className="nav-link text-white">
                                        Consultar Reportes
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SidebarAdminCompany;
