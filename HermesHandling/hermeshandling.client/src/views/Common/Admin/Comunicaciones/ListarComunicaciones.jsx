import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../../assets/css/AdminApp/ListarDocumentacionInterna.css";

function ListarComunicaciones() {
    const [comunicaciones, setComunicaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtroTitulo, setFiltroTitulo] = useState("");
    const [filtroFecha, setFiltroFecha] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchComunicaciones = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/AdminCommon/listar-comunicaciones`);
                setComunicaciones(response.data);
            } catch (error) {
                console.error("Error al obtener las comunicaciones:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchComunicaciones();
    }, []);

    const handleCrear = () => {
        navigate(`/admin-app/comunicaciones/crear`);
    };

    const handleEditar = (id) => {
        navigate(`/admin-app/comunicaciones/editar/${id}`);
    };

    const handleEliminar = async (id) => {
        const confirmar = window.confirm("¿Estás seguro de que deseas eliminar esta comunicación?");
        if (confirmar) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/api/AdminCommon/eliminar-comunicacion/${id}`);
                setComunicaciones(comunicaciones.filter((c) => c.id !== id));
                alert("Comunicación eliminada correctamente.");
            } catch (error) {
                console.error("Error al eliminar la comunicación:", error);
                alert("Hubo un error al intentar eliminar la comunicación.");
            }
        }
    };

    const comunicacionesFiltradas = comunicaciones.filter((comunicacion) => {
        const coincideTitulo = comunicacion.asunto
            ? comunicacion.asunto.toLowerCase().includes(filtroTitulo.toLowerCase())
                : false;
        const coincideFecha = !filtroFecha || (comunicacion.fecha &&
            new Date(comunicacion.fecha).toISOString().split("T")[0] === filtroFecha);
        return coincideTitulo && coincideFecha;
    });

    return (
        <div className="listar-container">
            <div className="contenido">
                <div className="header">
                    <h2>Comunicaciones</h2>
                    <button className="btn success" onClick={handleCrear}>Nueva Comunicación</button>
                </div>
                {loading ? (
                    <p>Cargando comunicaciones...</p>
                ) : (
                    <div className="tabla-wrapper">
                        <table className="tabla">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Asunto</th>
                                    <th>Fecha de Publicación</th>
                                    <th>Acciones</th>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder="Filtrar por título"
                                            value={filtroTitulo}
                                            onChange={(e) => setFiltroTitulo(e.target.value)}
                                            className="input"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="date"
                                            value={filtroFecha}
                                            onChange={(e) => setFiltroFecha(e.target.value)}
                                            className="input"
                                        />
                                    </td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {comunicacionesFiltradas.length > 0 ? (
                                    comunicacionesFiltradas.map((comunicacion) => (
                                        <tr key={comunicacion.id}>
                                            <td>{comunicacion.id}</td>
                                            <td>{comunicacion.asunto}</td>
                                            <td>{comunicacion.fechaPublicacion ? new Date(comunicacion.fechaPublicacion).toLocaleDateString("es-ES") : "Sin fecha"}</td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button
                                                        className="btn-edit"
                                                        onClick={() => handleEditar(comunicacion.id)}
                                                    >
                                                        <i className="fa-solid fa-pen-to-square"></i> Editar
                                                    </button>
                                                    <button
                                                        className="btn-delete"
                                                        onClick={() => handleEliminar(comunicacion.id)}
                                                    >
                                                        <i className="fa-solid fa-trash-can"></i> Eliminar
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="texto-centrado">No hay comunicaciones que coincidan.</td>
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

export default ListarComunicaciones;
