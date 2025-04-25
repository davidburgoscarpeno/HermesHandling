import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminApp from './views/AdminApp/AdminApp';
import AdminCompany from './views/AdminCompany/AdminCompany';
import Usuario from './views/Usuario/Usuario';
import Login from './views/LoginView';
import ListarUsuarios from './views/AdminApp/Usuarios/ListarUsuarios';
import CrearUsuario from './views/AdminApp/Usuarios/CrearUsuario';
import Dashboard from './views/AdminApp/Dashboard';
import EditarUsuario from './views/AdminApp/Usuarios/EditarUsuario';
import Comunicaciones from './views/AdminApp/Comunicaciones/ListarComunicaciones';
import Layout from './components/Layout'; // Importar el Layout
import './App.css';

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

                    <Route path="/admin-app" element={<Layout />}>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="usuarios/listar" element={<ListarUsuarios />} />
                        <Route path="usuarios/crear" element={<CrearUsuario />} />
                        <Route path="usuarios/editar" element={<EditarUsuario />} />
                        <Route path="usuarios/comunicaciones" element={<Comunicaciones />} />
                    </Route>

                    <Route path="/admin-company" element={<AdminCompany />} />
                    <Route path="/usuario" element={<Usuario />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
