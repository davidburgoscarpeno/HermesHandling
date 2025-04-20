import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminApp from './views/AdminApp/AdminApp';
import AdminCompany from './views/AdminCompany/AdminCompany';
import Usuario from './views/Usuario/Usuario';
import Login from './views/LoginView';
import ListarUsuarios from './views/AdminApp/Usuarios/ListarUsuarios'
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import CrearUsuario from './views/AdminApp/Usuarios/CrearUsuario';

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
        <Router> {/* Router aquí, no dentro de AdminApp */}
            <div>
                <button onClick={toggleDarkMode} className="dark-mode-toggle-btn">
                    <i className={`bi ${isDarkMode ? 'bi-sun' : 'bi-moon-stars'}`}></i>
                </button>

                <Routes>
                    {/* Rutas generales */}
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />

                    {/* AdminApp */}
                    <Route path="/admin-app" element={<AdminApp />} />
                    <Route path="/admin-app/usuarios/listar" element={<ListarUsuarios />} />
                    <Route path="/admin-app/usuarios/crear" element={<CrearUsuario />} />

                    {/* AdminCompany */}
                    <Route path="/admin-company" element={<AdminCompany />} />

                    {/* Usuario */}
                    <Route path="/usuario" element={<Usuario />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
