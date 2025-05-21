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
        // Filtrado por título (si el filtro está vacío, siempre es true)
        const coincideTitulo = !filtroTitulo
            || (comunicacion.asunto && comunicacion.asunto.toLowerCase().includes(filtroTitulo.toLowerCase()));

        // Filtrado por fecha (si el filtro está vacío, siempre es true)
        let coincideFecha = true;
        if (filtroFecha) {
            if (comunicacion.fechaPublicacion) {
                const fecha = new Date(comunicacion.fechaPublicacion);
                if (!isNaN(fecha.getTime())) {
                    // Formatea la fecha a YYYY-MM-DD en local
                    const yyyy = fecha.getFullYear();
                    const mm = String(fecha.getMonth() + 1).padStart(2, '0');
                    const dd = String(fecha.getDate()).padStart(2, '0');
                    const fechaLocal = `${yyyy}-${mm}-${dd}`;
                    coincideFecha = fechaLocal === filtroFecha;
                } else {
                    coincideFecha = false;
                }
            } else {
                coincideFecha = false;
            }
        }

        return coincideTitulo && coincideFecha;
    });





    return (
        <div className="listar-container">
            <div className="contenido">
                <div className="header">
                    <h2>Comunicaciones</h2>
                    <button className="btn success" onClick={handleCrear}>Nueva Comunicaci&oacute;n</button>
                </div>
                {loading ? (
                    <p>Cargando comunicaciones...</p>
                ) : (
                    <div className="tabla-wrapper">
                        <table className="tabla">
                            <thead>
                                <tr>
                                    <th>Asunto</th>
                                        <th>Fecha de Publicaci&oacute;n</th>
                                    <th>Acciones</th>
                                </tr>
                                <tr>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder="Filtrar por titulo"
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
