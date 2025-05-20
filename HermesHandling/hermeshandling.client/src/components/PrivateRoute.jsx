import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * Componente de ruta privada para proteger rutas que requieren autenticación.
 * Redirige a la página de inicio de sesión si el usuario no está autenticado.
 * 
 * @param {object} props
 * @param {boolean} props.isAuthenticated - Indica si el usuario está autenticado.
 * @returns {JSX.Element}
 */
const PrivateRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;