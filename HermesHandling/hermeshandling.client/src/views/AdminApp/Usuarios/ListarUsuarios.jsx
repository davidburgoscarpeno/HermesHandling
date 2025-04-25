import React, { useState, useEffect } from "react";
import SideBarAdminApp from "../../../components/SideBarAdminApp";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../assets/css/AdminApp/ListarUsuarios.css";

function ListarUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtroNombre, setFiltroNombre] = useState("");
    const [filtroApellido, setFiltroApellido] = useState("");
    const [filtroActivo, setFiltroActivo] = useState("todos");
    const [filtroTipo, setFiltroTipo] = useState("todos");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/AdminApp/listar-usuarios`);
                setUsuarios(response.data);
            } catch (error) {
                console.error("Error al obtener los usuarios:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsuarios();
    }, []);

    const handleEditar = (usuario) => {
        console.log("Usuario a editar:", usuario);
        navigate("/admin-app/usuarios/editar", { state: { usuario } });
    };

    const handleCrear = () => {
        navigate(`/admin-app/usuarios/crear`);
    };

    const handleEliminar = async (id) => {
        const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
        if (confirmar) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/api/AdminApp/delete-user/${id}`);
                setUsuarios((prev) => prev.filter((u) => u.id !== id));
            } catch (error) {
                console.error("Error al eliminar el usuario:", error);
            }
        }
    };

    const usuariosFiltrados = usuarios.filter((usuario) => {
        const coincideNombre = usuario.nombre.toLowerCase().includes(filtroNombre.toLowerCase());
        const coincideApellido = usuario.apellido.toLowerCase().includes(filtroApellido.toLowerCase());
        const coincideActivo =
            filtroActivo === "todos" ||
            (filtroActivo === "si" && usuario.activo) ||
            (filtroActivo === "no" && !usuario.activo);
        const coincideTipo =
            filtroTipo === "todos" || usuario.tipoUsuario.toString() === filtroTipo;

        return coincideNombre && coincideApellido && coincideActivo && coincideTipo;
    });

    return (
        <div className="layout-container">
            <div className="content-container">
                <div className="header">
                    <h2>Lista de Usuarios</h2>
                    <button className="btn-create" onClick={handleCrear}>
                        <i className="fa-solid fa-user-plus"></i> Nuevo Usuario
                    </button>
                </div>
                {loading ? (
                    <p>Cargando usuarios...</p>
                ) : (
                    <div className="table-responsive">
                        <table className="user-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Email</th>
                                    <th>Activo</th>
                                    <th>Tipo</th>
                                    <th>Acciones</th>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>
                                        <input
                                            type="text"
                                            className="filter-input"
                                            placeholder="Nombre"
                                            value={filtroNombre}
                                            onChange={(e) => setFiltroNombre(e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className="filter-input"
                                            placeholder="Apellido"
                                            value={filtroApellido}
                                            onChange={(e) => setFiltroApellido(e.target.value)}
                                        />
                                    </td>
                                    <td></td>
                                    <td>
                                        <select
                                            className="filter-select"
                                            value={filtroActivo}
                                            onChange={(e) => setFiltroActivo(e.target.value)}
                                        >
                                            <option value="todos">Todos</option>
                                            <option value="si">Si</option>
                                            <option value="no">No</option>
                                        </select>
                                    </td>
                                    <td>
                                        <select
                                            className="filter-select"
                                            value={filtroTipo}
                                            onChange={(e) => setFiltroTipo(e.target.value)}
                                        >
                                            <option value="todos">Todos</option>
                                            <option value="0">Admin App</option>
                                            <option value="1">Admin Company</option>
                                            <option value="2">Usuario</option>
                                        </select>
                                    </td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {usuariosFiltrados.length > 0 ? (
                                    usuariosFiltrados.map((usuario) => (
                                        <tr key={usuario.id}>
                                            <td>{usuario.id}</td>
                                            <td>{usuario.nombre}</td>
                                            <td>{usuario.apellido}</td>
                                            <td>{usuario.email}</td>
                                            <td>{usuario.activo ? "Si" : "No"}</td>
                                            <td>
                                                {usuario.tipoUsuario === 0
                                                    ? "Admin App"
                                                    : usuario.tipoUsuario === 1
                                                        ? "Admin Company"
                                                        : "Usuario"}
                                            </td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button
                                                        className="btn-edit"
                                                        onClick={() => handleEditar(usuario)}
                                                    >
                                                        <i className="fa-solid fa-pen-to-square"></i> Editar
                                                    </button>
                                                    <button
                                                        className="btn-delete"
                                                        onClick={() => handleEliminar(usuario.id)}
                                                    >
                                                        <i className="fa-solid fa-trash-can"></i> Eliminar
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center">
                                            No hay usuarios que coincidan con los filtros.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ListarUsuarios;
