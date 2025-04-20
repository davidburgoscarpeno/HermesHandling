import React, { useEffect, useState } from "react";
import SideBarAdminApp from "../../../components/SideBarAdminApp";
import axios from "axios";
import "../../../assets/css/AdminApp/ListarUsuarios.css"

function ListarUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/AdminApp/listar-admins-app`);
                setUsuarios(response.data);
            } catch (error) {
                console.error("Error al obtener los usuarios:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsuarios();
    }, []);

    const handleEditar = (id) => {
        console.log("Editar usuario con ID:", id);
        // Aquí podrías usar useNavigate(`/admin-app/usuarios/editar/${id}`)
    };

    const handleEliminar = async (id) => {
        const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
        if (confirmar) {
            try {
                // Usamos DELETE y pasamos el ID como parte de la URL
                await axios.delete(`${import.meta.env.VITE_API_URL}/api/AdminApp/delete-user/${id}`);
                setUsuarios((prev) => prev.filter((u) => u.id !== id)); // Actualizamos la lista de usuarios
            } catch (error) {
                console.error("Error al eliminar el usuario:", error);
            }
        }
    };



    return (
        <div className="d-flex">
            <SideBarAdminApp />
            <div className="container ml-1 mt-4">
                <h2>Lista de Usuarios</h2>
                {loading ? (
                    <p>Cargando usuarios...</p>
                ) : (
                    <table className="table table-bordered table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                    <th>Email</th>
                                    <th>Activo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.length > 0 ? (
                                usuarios.map((usuario) => (
                                    <tr key={usuario.id}>
                                        <td>{usuario.id}</td>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.apellido}</td>
                                        <td>{usuario.email}</td>
                                        <td>{usuario.activo ? "Si" : "No"}</td>
                                        <td>
                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => handleEditar(usuario.id)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleEliminar(usuario.id)}
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        No hay usuarios registrados.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default ListarUsuarios;
