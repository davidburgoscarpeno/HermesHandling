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
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/AdminApp/listar-reportes`);
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

    const reportesFiltrados = reportes.filter((reporte) => {
        const coincideUsuario = reporte.usuario_id.toString().includes(filtroUsuario);
        const coincideUbicacion = reporte.ubicacion.toLowerCase().includes(filtroUbicacion.toLowerCase());

        return coincideUsuario && coincideUbicacion;
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
                                    <th>ID Reporte</th>
                                    <th>Usuario ID</th>
                                    <th>Ubicaci&oacute;n</th>
                                    <th>Fecha de Creaci&oacute;n</th>
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
