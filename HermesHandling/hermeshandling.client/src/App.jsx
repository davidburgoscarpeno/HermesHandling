import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminApp from './views/AdminApp';
import AdminCompany from './views/AdminCompany';
import Usuario from './views/Usuario';
import Login from './views/LoginView';
import 'bootstrap-icons/font/bootstrap-icons.css';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/admin-app" element={<AdminApp />} />
                <Route path="/admin-company" element={<AdminCompany />} />
                <Route path="/usuario" element={<Usuario />} />
                <Route path="/" element={<Navigate to="/login" />} /> {/* Ruta predeterminada */}
            </Routes>
        </Router>
    );
};

export default App;