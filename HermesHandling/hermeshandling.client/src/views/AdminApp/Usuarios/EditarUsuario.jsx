import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../../../assets/css/AdminApp/EditarUsuario.css"
function EditarUsuario() {
    const location = useLocation();
    const navigate = useNavigate();
    const usuario = location.state?.usuario;

    const [formData, setFormData] = useState({
        nombre: usuario?.nombre || "",
        apellido: usuario?.apellido || "",
        email: usuario?.email || "",
        password: usuario?.password || "",
        tipoUsuario: usuario?.tipoUsuario || 0,
        activo: usuario?.activo ? 1 : 0  // Si activo es 'true' lo mandamos como 1, si es 'false' como 0
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (!usuario) {
            setError("No se encontr� el usuario.");
        }
    }, [usuario]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const data = new FormData();
            data.append("nombre", formData.nombre);
            data.append("apellido", formData.apellido);
            data.append("email", formData.email);
            data.append("password", formData.password);
            data.append("tipoUsuario", formData.tipoUsuario.toString());
            data.append("activo", formData.activo.toString()); // Convertimos a string (1 o 0)

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/AdminApp/edit-user`,
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            setSuccess("Usuario actualizado exitosamente.");
            setTimeout(() => navigate("/admin-app/usuarios/listar"), 2000);
        } catch (err) {
            setError("Error al actualizar el usuario. Revisa los datos.");
            console.error(err);
        }
    };

    return (
        <div className="editar-usuario-container">
            <div className="form-container">
                <h3>Editar Usuario</h3>
                {error && <div className="alert error">{error}</div>}
                {success && <div className="alert success">{success}</div>}

                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label>Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Apellido</label>
                        <input
                            type="text"
                            name="apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Contrase�a</label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Tipo de Usuario</label>
                        <select
                            name="tipoUsuario"
                            value={formData.tipoUsuario}
                            onChange={handleChange}
                        >
                            <option value={0}>Administrador App</option>
                            <option value={1}>Administrador Compa��a</option>
                            <option value={2}>Usuario</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Activo</label>
                        <select
                            name="activo"
                            value={formData.activo}
                            onChange={handleChange}
                        >
                            <option value={1}>S�</option>
                            <option value={0}>No</option>
                        </select>
                    </div>

                    <button type="submit" className="btn-submit">
                        Guardar cambios
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditarUsuario;
