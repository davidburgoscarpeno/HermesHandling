import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ toggleDarkMode, isDarkMode }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleEditProfile = () => {
    navigate('/usuario/editar-perfil'); 
  };

  return (
    <header className="header-app">
      <div className="header-left">
        <button onClick={toggleDarkMode} className="dark-mode-toggle-btn" aria-label="Cambiar modo oscuro">
          <i className={`bi ${isDarkMode ? 'bi-sun' : 'bi-moon-stars'}`}></i>
        </button>
      </div>
      <div className="header-right">
        <div className="dropdown">
          <button className="btn btn-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="bi bi-person-circle" style={{ fontSize: '2rem', color: '#fff' }}></i>
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <button className="dropdown-item" onClick={handleEditProfile}>Editar perfil</button>
            </li>
            <li>
              <button className="dropdown-item" onClick={handleLogout}>Cerrar sesión</button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;