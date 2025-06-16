import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * Componente de ruta privada para proteger rutas que requieren autenticaci�n.
 * Redirige a la p�gina de inicio de sesi�n si el usuario no est� autenticado.
 * 
 * @param {object} props
 * @param {boolean} props.isAuthenticated - Indica si el usuario est� autenticado.
 * @returns {JSX.Element}
 */
const PrivateRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;