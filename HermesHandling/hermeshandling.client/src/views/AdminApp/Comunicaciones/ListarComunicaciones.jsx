import React, { useState, useEffect } from "react";
import SideBarAdminApp from "../../../components/SideBarAdminApp";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../assets/css/AdminApp/ListarComunicaciones.css"
function ListarComunicaciones() {
    const [comunicaciones, setComunicaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtroAsunto, setFiltroAsunto] = useState("");
    const [filtroFechaEnvio, setFiltroFechaEnvio] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchComunicaciones = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/AdminApp/listar-comunicaciones`);
                setComunicaciones(response.data);
            } catch (error) {
                console.error("Error al obtener las comunicaciones:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchComunicaciones();
    }, []);

    const handleVerDetalles = (comunicacion) => {
        navigate("/admin-app/comunicaciones/detalles", { state: { comunicacion } });
    };

    const handleCrear = () => {
        navigate(`/admin-app/comunicaciones/crear`);
    };

    const comunicacionesFiltradas = comunicaciones.filter((comunicacion) => {
        const coincideAsunto = comunicacion.asunto.toLowerCase().includes(filtroAsunto.toLowerCase());
        const coincideFechaEnvio =
            !filtroFechaEnvio || comunicacion.fechaEnvio.includes(filtroFechaEnvio);

        return coincideAsunto && coincideFechaEnvio;
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
                                    <th>ID Comunicación</th>
                                    <th>Asunto</th>
                                    <th>Fecha de Envío</th>
                                    <th>Acciones</th>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder="Filtrar asunto"
                                            value={filtroAsunto}
                                            onChange={(e) => setFiltroAsunto(e.target.value)}
                                            className="input"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="date"
                                            value={filtroFechaEnvio}
                                            onChange={(e) => setFiltroFechaEnvio(e.target.value)}
                                            className="input"
                                        />
                                    </td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {comunicacionesFiltradas.length > 0 ? (
                                    comunicacionesFiltradas.map((comunicacion) => (
                                        <tr key={comunicacion.idComunicacion}>
                                            <td>{comunicacion.idComunicacion}</td>
                                            <td>{comunicacion.asunto}</td>
                                            <td>{comunicacion.fechaEnvio}</td>
                                            <td>
                                                <button className="btn info" onClick={() => handleVerDetalles(comunicacion)}>Ver Detalles</button>
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
