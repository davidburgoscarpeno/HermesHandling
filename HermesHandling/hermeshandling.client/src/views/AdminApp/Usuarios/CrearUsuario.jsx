import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../assets/css/AdminApp/CrearUsuario.css"
function CrearUsuario() {
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        tipoUsuario: 0,
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

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
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/AdminApp/create-user`,
                formData
            );
            setSuccess("Usuario creado exitosamente.");
            setTimeout(() => navigate("/admin-app/usuarios/listar"), 2000);
        } catch (err) {
            setError("Error al crear el usuario. Revisa los datos.");
            console.error(err);
        }
    };

    return (
        <div className="crear-usuario-form-container">
            <div className="crear-usuario-form-card">
                <h3>Crear Nuevo Usuario</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nombre</label>
                        <input
                            type="text"
                            className="crear-usuario-form-input"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Apellido</label>
                        <input
                            type="text"
                            className="crear-usuario-form-input"
                            name="apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            className="crear-usuario-form-input"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Contraseña</label>
                        <input
                            type="password"
                            className="crear-usuario-form-input"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Tipo de Usuario</label>
                        <select
                            className="crear-usuario-form-select"
                            name="tipoUsuario"
                            value={formData.tipoUsuario}
                            onChange={handleChange}
                        >
                            <option value={0}>Administrador App</option>
                            <option value={1}>Administrador Compañía</option>
                            <option value={2}>Usuario</option>
                        </select>
                    </div>

                    <button type="submit" className="crear-usuario-btn-submit">
                        Crear Usuario
                    </button>
                </form>

                {success && <div className="crear-usuario-alert-message crear-usuario-alert-success">{success}</div>}
                {error && <div className="crear-usuario-alert-message crear-usuario-alert-error">{error}</div>}
            </div>
        </div>
    );
}

export default CrearUsuario;
