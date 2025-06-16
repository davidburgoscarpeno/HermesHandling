import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../assets/css/AdminApp/SideBarAdmin.css";
import logoHermes from "../assets/images/logo_hermesHandlingBg.png";
import logoHermesInvertido from "../assets/images/hermes.png";



const SidebarAdminApp = () => {
    const [openMenu, setOpenMenu] = useState({
        dashboard: false,
        usuarios: false,
        configuracion: false,
        reports: false,
    });
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = (menu) => {
        setOpenMenu((prevState) => ({
            ...prevState,
            [menu]: !prevState[menu],
        }));
    };

    const user = JSON.parse(localStorage.getItem('usuario'));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        navigate("/login");
    };

    return (
        <div className="sidebar-container d-flex flex-column justify-content-between" style={{height: "100%"}}>
            <div>
                <div className="sidebar-header">
                    <img
                        src={logoHermesInvertido}
                        alt="Logo de la app"
                        style={{ width: "210px", height: "210px" }}
                    />
                </div>

                {/* Menú */}
                <div className="sidebar-menu">
                    <ul className="nav flex-column">
                        {/* Dashboard */}
                        <li className="nav-item">
                            <Link to="/admin-app/dashboard" className="nav-link text-white">
                                Dashboard
                            </Link>
                        </li>
                        {/* Usuarios */}
                        <li className="nav-item">
                            <button
                                className="nav-link text-white w-100 text-start btn-toggle"
                                onClick={() => toggleMenu("usuarios")}
                            >
                                Gesti&oacute;n <i className={`bi bi-chevron-${openMenu.usuarios ? "down" : "right"}`}></i>
                            </button>
                            <div className={`submenu ${openMenu.usuarios ? "expanded" : ""}`}>
                                <ul className="nav flex-column ms-3">
                                    <li className="nav-item">
                                        <Link to="/admin-app/usuarios/listar" className="nav-link text-white">
                                            Gesti&oacute;n Usuarios
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin-app/equipos/listar-equipos" className="nav-link text-white">
                                            Gesti&oacute;n Equipos
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin-app/documentacion-interna" className="nav-link text-white">
                                            Documentacion Interna
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin-app/comunicaciones" className="nav-link text-white">
                                            Comunicaciones
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
                                        <Link to="/admin-app/reportes/listar-reportes" className="nav-link text-white">
                                            Gesti&oacute;n Reportes
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        {/* Configuración
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
                        </li> */}
                    </ul>
                </div>
            </div>
            {/* Menú de usuario */}
            <div className="sidebar-user-menu mb-3 text-center">
                <div className="user-avatar-wrapper" onClick={() => setUserMenuOpen(!userMenuOpen)}>
                    <i className="bi bi-person-circle"></i>
                </div>
                <div className="user-name text-white mt-2" style={{ fontSize: "1rem" }}>
                    {user ? user.nombreUsuario : "Nombre Usuario"}
                </div>
                {userMenuOpen && (
                    <div className="dropdown-menu show user-dropdown-menu">
                        <button className="dropdown-item" onClick={() => { setUserMenuOpen(false); navigate("/admin-app/ver-perfil"); }}>
                            Perfil
                        </button>
                        <button className="dropdown-item" onClick={handleLogout}>
                            Cerrar sesi&oacute;n
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SidebarAdminApp;

