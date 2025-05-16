import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../../assets/css/AdminApp/ListarDocumentacionInterna.css";

function ListarDocumentacion() {
    const [documentaciones, setDocumentaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtroNombre, setFiltroNombre] = useState("");
    const [filtroFechaAlta, setFiltroFechaAlta] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDocumentaciones = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/AdminCommon/listar-documentacion-interna`);
                console.log("Datos recibidos:", response.data); // Verifica si `fecha_alta` está presente
                setDocumentaciones(response.data);
            } catch (error) {
                console.error("Error al obtener las documentaciones:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDocumentaciones();
    }, []);


    const handleCrear = () => {
        navigate(`/admin-app/documentacion-interna/crear`);
    };

    const handleEditar = (id) => {
        navigate(`/admin-app/documentacion-interna/editar/${id}`);
    };

    const handleEliminar = async (id) => {
        const confirmar = window.confirm("¿Estás seguro de que deseas eliminar esta documentación?");
        if (confirmar) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/api/AdminCommon/eliminar-documentacion/${id}`);
                setDocumentaciones(documentaciones.filter((doc) => doc.id !== id));
                alert("Documentación eliminada correctamente.");
            } catch (error) {
                console.error("Error al eliminar la documentación:", error);
                alert("Hubo un error al intentar eliminar la documentación.");
            }
        }
    };

    const documentacionesFiltradas = documentaciones.filter((documentacion) => {
        const coincideNombre = documentacion.nombre
            ? documentacion.nombre.toLowerCase().includes(filtroNombre.toLowerCase())
            : false;

        const coincideFechaAlta = !filtroFechaAlta || (documentacion.fechaAlta &&
            new Date(documentacion.fechaAlta).toISOString().split("T")[0] === filtroFechaAlta);

        return coincideNombre && coincideFechaAlta;
    });

    return (
        <div className="listar-container">
            <div className="contenido">
                <div className="header">
                    <h2>Documentaci&oacute;n Interna</h2>
                    <button className="btn success" onClick={handleCrear}>Nueva Documentaci&oacute;n</button>
                </div>

                {loading ? (
                    <p>Cargando documentaciones...</p>
                ) : (
                    <div className="tabla-wrapper">
                        <table className="tabla">
                            <thead>
                                <tr>
                                    <th>ID Documentaci&oacute;n</th>
                                    <th>Nombre</th>
                                    <th>Fecha de Alta</th>
                                    <th>Acciones</th>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder="Filtrar por nombre"
                                            value={filtroNombre}
                                            onChange={(e) => setFiltroNombre(e.target.value)}
                                            className="input"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="date"
                                            value={filtroFechaAlta}
                                            onChange={(e) => setFiltroFechaAlta(e.target.value)}
                                            className="input"
                                        />
                                    </td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {documentacionesFiltradas.length > 0 ? (
                                    documentacionesFiltradas.map((documentacion) => (
                                        <tr key={documentacion.id}>
                                            <td>{documentacion.id}</td>
                                            <td>{documentacion.nombre}</td>
                                            <td>{documentacion.fechaAlta ? new Date(documentacion.fechaAlta).toLocaleDateString("es-ES") : "Sin fecha"}</td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button
                                                        className="btn-edit"
                                                        onClick={() => handleEditar(documentacion.id)}
                                                    >
                                                        <i className="fa-solid fa-pen-to-square"></i> Editar
                                                    </button>
                                                    <button
                                                        className="btn-delete"
                                                        onClick={() => handleEliminar(documentacion.id)}
                                                    >
                                                        <i className="fa-solid fa-trash-can"></i> Eliminar
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="texto-centrado">No hay documentaciones que coincidan.</td>
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

export default ListarDocumentacion;
