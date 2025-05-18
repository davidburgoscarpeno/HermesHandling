import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../assets/css/AdminApp/ListarReportes.css";

function ListarReportes() {
    const [reportes, setReportes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtroUsuario, setFiltroUsuario] = useState("");
    const [filtroUbicacion, setFiltroUbicacion] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReportes = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/AdminCommon/listar-reportes`);
                setReportes(response.data);
            } catch (error) {
                console.error("Error al obtener los reportes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReportes();
    }, []);

    const handleVerDetalles = (reporte) => {
        navigate("/admin-app/reportes/detalles", { state: { reporte } });
    };

    const handleCrear = () => {
        navigate(`/admin-app/reportes/crear`);
    };

    const handleEditar = (id) => {
        navigate(`/admin-app/reportes/editar/${id}`);
    };

    const handleEliminar = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este reporte?")) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/api/AdminCommon/eliminar-reporte/${id}`);
                setReportes(reportes.filter((r) => r.id !== id));
            } catch (error) {
                alert("Hubo un error al eliminar el reporte.");
            }
        }
    };

    const reportesFiltrados = reportes.filter((reporte) => {
        const coincideTitulo = reporte.titulo
            ? reporte.titulo.toLowerCase().includes(filtroTitulo.toLowerCase())
            : false;
        const coincideFecha = !filtroFecha || (reporte.fechaCreacion &&
            new Date(reporte.fechaCreacion).toISOString().split("T")[0] === filtroFecha);
        return coincideTitulo && coincideFecha;
    });

    return (
        <div className="listar-container">
            <div className="contenido">
                <div className="header">
                    <h2>Reportes</h2>
                    <button className="btn success" onClick={handleCrear}>Nuevo Reporte</button>
                </div>

                {loading ? (
                    <p>Cargando reportes...</p>
                ) : (
                    <div className="tabla-wrapper">
                        <table className="tabla">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Título</th>
                                    <th>Fecha de Creación</th>
                                    <th>ID</th>
                                    <th>Título</th>
                                    <th>Fecha de Creación</th>
                                    <th>Acciones</th>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder="Filtrar usuario"
                                            value={filtroUsuario}
                                            onChange={(e) => setFiltroUsuario(e.target.value)}
                                            className="input"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder="Filtrar ubicaci&oacute;n"
                                            value={filtroUbicacion}
                                            onChange={(e) => setFiltroUbicacion(e.target.value)}
                                            className="input"
                                        />
                                    </td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {reportesFiltrados.length > 0 ? (
                                    reportesFiltrados.map((reporte) => (
                                        <tr key={reporte.id}>
                                            <td>{reporte.id}</td>
                                            <td>{reporte.usuario_id}</td>
                                            <td>{reporte.ubicacion}</td>
                                            <td>{new Date(reporte.fecha_creacion).toLocaleString()}</td>
                                            <td>
                                                <button className="btn info" onClick={() => handleVerDetalles(reporte)}>Ver Detalles</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="texto-centrado">No hay reportes que coincidan.</td>
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

export default ListarReportes;

