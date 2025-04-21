import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import SidebarAdminApp from "../../../components/SideBarAdminApp";

function EditarUsuario() {
    const location = useLocation();
    const navigate = useNavigate();
    const usuario = location.state?.usuario; // Recibe el usuario completo desde el state

    const [formData, setFormData] = useState({
        nombre: usuario?.nombre || "",
        apellido: usuario?.apellido || "",
        email: usuario?.email || "",
        tipoUsuario: usuario?.tipoUsuario || 0,
        activo: usuario?.activo ? "si" : "no", // "si" o "no" para el select
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (!usuario) {
            setError("No se encontró el usuario.");
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
            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/api/AdminApp/update-user/${usuario.id}`,
                formData
            );
            setSuccess("Usuario actualizado exitosamente.");
            setTimeout(() => navigate("/admin-app/usuarios/listar"), 2000);
        } catch (err) {
            setError("Error al actualizar el usuario. Revisa los datos.");
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
                            <h3 className="mb-4 text-center">Editar Usuario</h3>
                            {error && <div className="alert alert-danger">{error}</div>}
                            {success && <div className="alert alert-success">{success}</div>}

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
                                    <label className="form-label">Tipo de Usuario</label>
                                    <select
                                        className="form-select"
                                        name="tipoUsuario"
                                        value={formData.tipoUsuario}
                                        onChange={handleChange}
                                    >
                                        <option value={0}>Administrador App</option>
                                        <option value={1}>Administrador Compañía</option>
                                        <option value={2}>Usuario</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Activo</label>
                                    <select
                                        className="form-select"
                                        name="activo"
                                        value={formData.activo}
                                        onChange={handleChange}
                                    >
                                        <option value="si">Si</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>

                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">
                                        Guardar cambios
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditarUsuario;
