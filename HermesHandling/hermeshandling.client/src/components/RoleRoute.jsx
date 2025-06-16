import { Navigate } from "react-router-dom";

const RoleRoute = ({ allowedRoles, children }) => {
   

    const user = JSON.parse(localStorage.getItem("usuario"));

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user.tipoUsuarioNombre)) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default RoleRoute;
