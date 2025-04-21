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
        // Redirigir a la página de editar, pasando todo el objeto usuario en el estado
        console.log("Usuario a editar:", usuario); // Verifica que el usuario completo se pasa correctamente
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
        <div className="d-flex">
            <SideBarAdminApp />
            <div className="container ml-1 mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="mb-0">Lista de Usuarios</h2>
                    <button
                        className="btn btn-success btn-sm"
                        onClick={handleCrear}
                    >
                        Nuevo Usuario
                    </button>
                </div>
                {loading ? (
                    <p>Cargando usuarios...</p>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-bordered modern-table">
                            <thead className="table-color">
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
                                            className="form-control form-control-sm"
                                            placeholder="Nombre"
                                            value={filtroNombre}
                                            onChange={(e) => setFiltroNombre(e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            placeholder="Apellido"
                                            value={filtroApellido}
                                            onChange={(e) => setFiltroApellido(e.target.value)}
                                        />
                                    </td>
                                    <td></td>
                                    <td>
                                        <select
                                            className="form-select form-select-sm"
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
                                            className="form-select form-select-sm"
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
                                                <button
                                                    className="btn btn-warning btn-sm me-2"
                                                    onClick={() => handleEditar(usuario)} // Pasa el objeto completo usuario
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
