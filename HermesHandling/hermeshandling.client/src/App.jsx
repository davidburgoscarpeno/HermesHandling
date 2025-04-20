import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminApp from './views/AdminApp';
import AdminCompany from './views/AdminCompany';
import Usuario from './views/Usuario';
import Login from './views/LoginView';
import 'bootstrap-icons/font/bootstrap-icons.css';
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
            <div>
                <button onClick={toggleDarkMode} className="dark-mode-toggle-btn">
                    <i className={`bi ${isDarkMode ? 'bi-sun' : 'bi-moon-stars'}`}></i>
                </button>

                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin-app" element={<AdminApp />} />
                    <Route path="/admin-company" element={<AdminCompany />} />
                    <Route path="/usuario" element={<Usuario />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
