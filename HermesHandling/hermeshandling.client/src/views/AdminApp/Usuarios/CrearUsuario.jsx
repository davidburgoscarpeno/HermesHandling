import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SidebarAdminApp from "../../../components/SideBarAdminApp";

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
        <div className="d-flex">
            <SidebarAdminApp />
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card p-4">
                            <h3 className="mb-4 text-center">Crear Nuevo Usuario</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Apellido</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="apellido"
                                        value={formData.apellido}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Contrase&ntilde;a</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>



                                <div className="mb-4">
                                    <label className="form-label">Tipo de Usuario</label>
                                    <select
                                        className="form-select"
                                        name="tipoUsuario"
                                        value={formData.tipoUsuario}
                                        onChange={handleChange}
                                    >
                                        <option value={0}>Administrador App</option>
                                        <option value={1}>Administrador Compa&ntilde;ia</option>
                                        <option value={2}>Usuario</option>
                                    </select>
                                </div>

                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">
                                        Crear Usuario
                                    </button>
                                </div>
                            </form>

                            {success && <div className="alert alert-success mt-3">{success}</div>}
                            {error && <div className="alert alert-danger mt-3">{error}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CrearUsuario;
