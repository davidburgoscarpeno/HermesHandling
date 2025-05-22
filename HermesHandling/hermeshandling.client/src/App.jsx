import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import AdminCompany from './views/AdminCompany/AdminCompany';
import Usuario from './views/Usuario/Usuario';
//Login
import Login from './views/LoginView';
//Usuarios
import ListarUsuarios from './views/Common/Admin/Usuarios/ListarUsuarios';
import CrearUsuario from './views/Common/Admin/Usuarios/CrearUsuario';
import Dashboard from './views/Common/Admin/Dashboard';
import EditarUsuario from './views/Common/Admin/Usuarios/EditarUsuario';
//Documentacion Interna
import DocumentacionInterna from './views/Common/Admin/DocumentacionInterna/ListarDocumentacionInterna';
import CrearDocumentacionInterna from './views/Common/Admin/DocumentacionInterna/CrearDocumentacionInterna'
import EditarDocumentacionInterna from './views/Common/Admin/DocumentacionInterna/EditarDocumentacionInterna'

//Comunicaciones
import ListarComunicaciones from './views/Common/Admin/Comunicaciones/ListarComunicaciones';
import CrearComunicacion from './views/Common/Admin/Comunicaciones/CrearComunicacion';
import EditarComunicacion from './views/Common/Admin/Comunicaciones/EditarComunicacion';

//Reportes
import ListarReportes from './views/Common/Reportes/ListarReportes';
import CrearReporte from './views/Common/Reportes/CrearReporte';
import Layout from './components/Layout'; // Importar el Layout
import './App.css';
import VerUsuario from './views/Usuario/VerUsuario';
import VerDetallesReporte from './views/Common/Admin/Reportes/VerDetallesReporte';
import CrearReporteUsuario from './views/Usuario/CrearReporte';

//Equipos
import ListarEquipos from './views/Common/Admin/Equipos/ListarEquipos';
import CrearEquipo from './views/Common/Admin/Equipos/CrearEquipo';
import EditarEquipo from './views/Common/Admin/Equipos/EditarEquipo';

// Importa tu componente RoleRoute
import RoleRoute from './components/RoleRoute';
import RegisterView from './views/RegisterView';
import VerComunicados from './views/Usuario/VerComunicados';
import VerDocumentacionInterna from './views/Usuario/VerDocumentacionInterna';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('token');
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode') === 'true';
        return savedMode;
    });

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem('darkMode', newMode);
            return newMode;
        });
    };

    return (
        <Router>
            <div className="app-container">
                <button onClick={toggleDarkMode} className="dark-mode-toggle-btn">
                    <i className={`bi ${isDarkMode ? 'bi-sun' : 'bi-moon-stars'}`}></i>
                </button>

                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<RegisterView />} />


                    <Route path="/admin-app" element={
                        <PrivateRoute>
                            <RoleRoute allowedRoles={["admin", "superadmin"]}>
                                <Layout />
                            </RoleRoute>
                        </PrivateRoute>
                    }>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="usuarios/listar" element={<ListarUsuarios />} />
                        <Route path="usuarios/crear" element={<CrearUsuario />} />
                        <Route path="usuarios/editar" element={<EditarUsuario />} />

                        <Route path="comunicaciones" element={<ListarComunicaciones />} />
                        <Route path="comunicaciones/crear" element={<CrearComunicacion />} />
                        <Route path="comunicaciones/editar/:id" element={<EditarComunicacion />} />

                        <Route path="documentacion-interna" element={<DocumentacionInterna />} />
                        <Route path="documentacion-interna/crear" element={<CrearDocumentacionInterna />} />
                        <Route path="documentacion-interna/editar" element={<EditarDocumentacionInterna />} />
                        <Route path="documentacion-interna/editar/:id" element={<EditarDocumentacionInterna />} />

                        <Route path="equipos/listar-equipos" element={<ListarEquipos />} />
                        <Route path="equipos/crear" element={<CrearEquipo />} />
                        <Route path="equipos/editar/:id" element={<EditarEquipo />} />

                        <Route path="reportes/listar-reportes" element={<ListarReportes />} />
                        <Route path="reportes/crear" element={<CrearReporte />} />
                        <Route path="reportes/editar" element={<CrearReporte />} />
                        <Route path="reportes/detalles/:id" element={<VerDetallesReporte />} />

                        <Route path="ver-perfil" element={<VerUsuario />} />
                    </Route>

                    <Route path="/usuario" element={
                        <PrivateRoute>
                            <RoleRoute allowedRoles={["usuario"]}>
                                <Outlet />
                            </RoleRoute>
                        </PrivateRoute>
                    }>
                        <Route index element={<Usuario />} />
                        <Route path="ver-comunicaciones" element={<VerComunicados />} />
                        <Route path="ver-documentacion-interna" element={<VerDocumentacionInterna />} />
                        <Route path="crear-reporte" element={<CrearReporteUsuario />} />
                        <Route path="ver-reporte/:id" element={<VerDetallesReporte />} />
                    </Route>

                    <Route path="/admin-company" element={
                        <PrivateRoute>
                            <RoleRoute allowedRoles={["adminCompany"]}>
                                <AdminCompany />
                            </RoleRoute>
                        </PrivateRoute>
                    } />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
