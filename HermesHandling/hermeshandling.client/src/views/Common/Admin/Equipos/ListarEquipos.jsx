import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../../assets/css/AdminApp/ListarEquipos.css";

function ListarEquipos() {
    const [equipos, setEquipos] = useState([]);
    const [tiposEquipo, setTiposEquipo] = useState([]);
    const [filtroNombre, setFiltroNombre] = useState("");
    const [filtroAssetId, setFiltroAssetId] = useState("");
    const [filtroTipo, setFiltroTipo] = useState("");
    const [filtroEstado, setFiltroEstado] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/UserCommon/equipos`)
            .then(res => setEquipos(Array.isArray(res.data) ? res.data : []))
            .catch(() => setEquipos([]));
        axios.get(`${import.meta.env.VITE_API_URL}/api/UserCommon/tipos-equipo`)
            .then(res => setTiposEquipo(Array.isArray(res.data) ? res.data : []))
            .catch(() => setTiposEquipo([]));
    }, []);

    const equiposFiltrados = equipos.filter(e =>
        (filtroNombre === "" || (e.nombre && e.nombre.toLowerCase().includes(filtroNombre.toLowerCase()))) &&
        (filtroAssetId === "" || (e.assetId && e.assetId.toLowerCase().includes(filtroAssetId.toLowerCase()))) &&
        (filtroTipo === "" || (e.tipoEquipoId && e.tipoEquipoId.toString() === filtroTipo)) &&
        (filtroEstado === "" || (e.estado && e.estado === filtroEstado))
    );

    const handleCrear = () => {
        navigate("/admin-app/equipos/crear");
    };

    const handleEditar = (id) => {
        navigate(`/admin-app/equipos/editar/${id}`);
    };

    const handleBorrar = async (id) => {
        if (!window.confirm("¿Seguro que deseas borrar este equipo?")) return;
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/UserCommon/borrar-equipo/${id}`);
            setEquipos(equipos.filter(e => e.id !== id));
        } catch (error) {
            alert("Error al borrar el equipo.");
        }
    };

    return (
        <div className="layout-container">
            <div className="content-container">
                <div className="header">
                    <h2>Equipos</h2>
                    <button className="btn-create" onClick={handleCrear}>
                        <i className="bi bi-plus-circle"></i> Nuevo Equipo
                    </button>
                </div>
                <div className="tabla-wrapper">
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>Identificador</th>
                                <th>Nombre</th>
                                <th>Descripci&oacute;n</th>
                                <th>Estado</th>
                                <th>Fecha de Creaci&oacute;n</th>
                                <th>Fecha &Uacute;ltima Revisi&oacute;n</th>
                                <th>Acciones</th>
                            </tr>
                            <tr>
                                <th>
                                    <input
                                        type="text"
                                        className="filter-input"
                                        placeholder="Filtrar Asset ID"
                                        value={filtroAssetId}
                                        onChange={e => setFiltroAssetId(e.target.value)}
                                    />
                                </th>
                                <th>
                                    <input
                                        type="text"
                                        className="filter-input"
                                        placeholder="Filtrar Nombre"
                                        value={filtroNombre}
                                        onChange={e => setFiltroNombre(e.target.value)}
                                    />
                                </th>
                                <th></th>
                                <th>
                                    <select
                                        className="filter-select"
                                        value={filtroEstado}
                                        onChange={e => setFiltroEstado(e.target.value)}
                                    >
                                        <option value="">Todos</option>
                                        <option value="Operativo">Operativo</option>
                                        <option value="En mantenimiento">En Mantenimiento</option>
                                    </select>
                                </th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {equiposFiltrados.length > 0 ? (
                                equiposFiltrados.map(equipo => (
                                    <tr key={equipo.id}>
                                        <td>{equipo.assetId}</td>
                                        <td>{equipo.nombre}</td>
                                        <td>{equipo.descripcion}</td>
                                        <td>{equipo.estado}</td>
                                        <td>
                                            {equipo.fechaCreacion
                                                ? new Date(equipo.fechaCreacion).toLocaleDateString()
                                                : ""}
                                        </td>
                                        <td>
                                            {equipo.fechaUltimaRevision
                                                ? new Date(equipo.fechaUltimaRevision).toLocaleDateString()
                                                : ""}
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <button
                                                    className="btn-edit"
                                                    title="Editar"
                                                    onClick={() => handleEditar(equipo.id)}
                                                >
                                                    <i className="bi bi-pencil-square"></i> Editar
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    title="Borrar"
                                                    onClick={() => handleBorrar(equipo.id)}
                                                >
                                                    <i className="bi bi-trash"></i> Borrar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="text-center">No hay equipos que coincidan.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ListarEquipos;
