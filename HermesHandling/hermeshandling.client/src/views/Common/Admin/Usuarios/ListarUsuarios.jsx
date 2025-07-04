import React, { useState, useEffect } from "react";
import SideBarAdminApp from "../../../../components/SideBarAdminApp";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../../assets/css/AdminApp/ListarUsuarios.css";

function ListarUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtroNombre, setFiltroNombre] = useState("");
    const [filtroApellido, setFiltroApellido] = useState("");
    const [filtroEmail, setFiltroEmail] = useState("");
    const [filtroActivo, setFiltroActivo] = useState("todos");
    const [filtroTipo, setFiltroTipo] = useState("todos");
    const navigate = useNavigate();

    const tipos = {
        0: "Admin App",
        1: "Cordinador",
        2: "Usuario"
    };

    // Obt�n el token del localStorage
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/AdminApp/listar-usuarios`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setUsuarios(response.data);
            } catch (error) {
                console.error("Error al obtener los usuarios:", error);
                // Si el token es inv�lido o expir�, redirige al login
                if (error.response && error.response.status === 401) {
                    window.location.href = "/login";
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUsuarios();
    }, []);

    const handleEditar = (usuario) => {
        navigate("/admin-app/usuarios/editar", { state: { usuario } });
    };

    const handleCrear = () => {
        navigate(`/admin-app/usuarios/crear`);
    };

    const handleEliminar = async (id) => {
        const confirmar = window.confirm("�Est�s seguro de que deseas eliminar este usuario?");
        if (confirmar) {
            try {
                await axios.delete(
                    `${import.meta.env.VITE_API_URL}/api/AdminApp/delete-user/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setUsuarios((prev) => prev.filter((u) => u.id !== id));
            } catch (error) {
                console.error("Error al eliminar el usuario:", error);
                if (error.response && error.response.status === 401) {
                    window.location.href = "/login";
                }
            }
        }
    };

    const usuariosFiltrados = usuarios.filter((usuario) => {
        const coincideNombre = usuario.nombre.toLowerCase().includes(filtroNombre.toLowerCase());
        const coincideApellido = usuario.apellido.toLowerCase().includes(filtroApellido.toLowerCase());
        const coincideEmail = usuario.email.toLowerCase().includes(filtroEmail.toLowerCase());

        const coincideActivo =
            filtroActivo === "todos" ||
            (filtroActivo === "si" && usuario.activo) ||
            (filtroActivo === "no" && !usuario.activo);

        const coincideTipo =
            filtroTipo === "todos" ||
            String(usuario.tipoUsuario) === String(filtroTipo);

        return coincideNombre && coincideApellido && coincideActivo && coincideTipo && coincideEmail;
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
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Email</th>
                                    <th>Activo</th>
                                    <th>Tipo</th>
                                    <th>Acciones</th>
                                </tr>
                                <tr>
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
                                    <td>
                                        <input
                                            type="text"
                                            className="filter-input"
                                            placeholder="Email"
                                            value={filtroEmail}
                                            onChange={(e) => setFiltroEmail(e.target.value)}
                                        />
                                    </td>
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
                                            <option value="1">Coordinador</option>
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
                                            <td>{usuario.nombre}</td>
                                            <td>{usuario.apellido}</td>
                                            <td>{usuario.email}</td>
                                            <td>{usuario.activo ? "Si" : "No"}</td>
                                            <td>
                                                {tipos[Number(usuario.tipoUsuario)] ?? usuario.tipoUsuario ?? "Sin tipo"}
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
