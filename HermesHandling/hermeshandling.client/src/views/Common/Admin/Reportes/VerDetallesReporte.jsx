import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../../assets/css/AdminApp/VerDetallesReporte.css";

function VerDetallesReporte() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [reporte, setReporte] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [obsResuelto, setObsResuelto] = useState("");
    const [resolviendo, setResolviendo] = useState(false);

    useEffect(() => {
        const fetchReporte = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/AdminCommon/get-reporte/${id}`);
                setReporte(response.data);
                setObsResuelto(response.data.observacionesResuelto || "");
            } catch (err) {
                setError("No se encontro informacion del reporte.");
            } finally {
                setLoading(false);
            }
        };
        fetchReporte();
    }, [id]);

    const formatKey = (key) => {
        return key
            .replace(/([A-Z])/g, " $1")
            .replace(/_/g, " ")
            .replace(/^./, (str) => str.toUpperCase());
    };

    const formatValue = (key, value) => {
        if (value === null || value === undefined) return <span style={{ color: "#888" }}>Sin valor</span>;
        if (typeof value === "boolean")
            return value
                ? <span>S&iacute;</span>
                : <span>No</span>;
        if (key.toLowerCase().includes("fecha") && value) return new Date(value).toLocaleString();
        return value.toString();
    };

    const handleResolver = async () => {
        setResolviendo(true);
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/api/AdminCommon/resolver-reporte/${id}`, {
                observacionesResuelto: obsResuelto
            });
            setReporte(prev => ({ ...prev, observacionesResuelto: obsResuelto, activo: false }));
        } catch (err) {
            alert("Error al resolver el reporte.");
        } finally {
            setResolviendo(false);
        }
    };

    if (loading) {
        return (
            <div className="detalles-container">
                <h2>Detalles del Reporte</h2>
                <p>Cargando...</p>
            </div>
        );
    }

    if (error || !reporte) {
        return (
            <div className="detalles-container">
                <h2>Detalles del Reporte</h2>
                <p>{error || "No se encontró información del reporte."}</p>
                <button className="btn" onClick={() => navigate(-1)}>Volver</button>
            </div>
        );
    }

    return (
        <div className="detalles-container">
            <h2>Detalles del Reporte</h2>
            <table className="tabla-detalles">
                <tbody>
                    {/* Propiedades principales */}
                    {Object.entries(reporte).map(([key, value]) =>
                        key !== "defectosReportados" &&
                        key !== "documentos" &&
                        key !== "equipo" &&
                        key !== "reportesDocumentos" && (
                            <tr key={key}>
                                <th>{formatKey(key)}</th>
                                <td>
                                    {key === "observacionesResuelto" && (!value || value === "") ? (
                                        <input
                                            type="text"
                                            value={obsResuelto}
                                            onChange={e => setObsResuelto(e.target.value)}
                                            className="input"
                                            placeholder="Introducir observaciones resuelto"
                                            disabled={resolviendo}
                                        />
                                    ) : (
                                        formatValue(key, value)
                                    )}
                                </td>
                            </tr>
                        )
                    )}

                    {/* Defectos reportados */}
                    <tr>
                        <th>Defectos Reportados</th>
                        <td>
                            {reporte.defectosReportados && reporte.defectosReportados.length > 0 ? (
                                <ul>
                                    {reporte.defectosReportados.map((def, idx) => (
                                        <li key={def.id || idx}>
                                            {def.tipoDefecto?.nombre || def.tipoDefectoId || def || "Defecto sin nombre"}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <span style={{ color: "#888" }}>Sin defectos</span>
                            )}
                        </td>
                    </tr>

                    {/* Documentos */}
                    <tr>
                        <th>Documentos</th>
                        <td>
                            {reporte.documentos && reporte.documentos.length > 0 ? (
                                <ul>
                                    {reporte.documentos.map((doc, idx) => (
                                        <li key={doc.id || idx}>
                                            {typeof doc === "string" ? doc : (
                                                doc.nombre ? (
                                                    <a href={doc.pathDocumento} target="_blank" rel="noopener noreferrer">
                                                        {doc.nombre}
                                                    </a>
                                                ) : (
                                                    doc.pathDocumento
                                                )
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <span style={{ color: "#888" }}>Sin documentos</span>
                            )}
                        </td>
                    </tr>
                </tbody>

            </table>
            {/* Solo muestra el botón Resolver si el reporte no está resuelto */}
            {(!reporte.observacionesResuelto || reporte.observacionesResuelto === "") && (
                <button
                    className="btn success"
                    onClick={handleResolver}
                    disabled={resolviendo || !obsResuelto.trim()}
                >
                    {resolviendo ? "Resolviendo..." : "Resolver"}
                </button>
            )}
            <button className="btn" onClick={() => navigate(-1)} style={{ marginLeft: 8 }}>Volver</button>
        </div>
    );
}

export default VerDetallesReporte;
