import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../../assets/css/AdminApp/VerDetallesReporte.css"

function VerDetallesReporte() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [reporte, setReporte] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showExportMenu, setShowExportMenu] = useState(false);

    useEffect(() => {
        const fetchReporte = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/AdminCommon/get-reporte/${id}`);
                setReporte(response.data);
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

    // Exportar a Excel
    const exportDetalleToExcel = () => {
        if (!reporte) return;

        const data = [
            { Propiedad: "ID", Valor: reporte.id },
            { Propiedad: "Ubicación", Valor: reporte.ubicacion },
            { Propiedad: "Fecha de Creación", Valor: new Date(reporte.fechaCreacion).toLocaleString() },
            { Propiedad: "Activo", Valor: reporte.activo ? "Sí" : "No" },
            { Propiedad: "Observaciones", Valor: reporte.observaciones || "" }
        ];

        if (reporte.assetIdEquipo) {
            data.push({ Propiedad: "Identificador Equipo", Valor: reporte.assetIdEquipo });
        }

        if (reporte.observacionesResuelto) {
            data.push({ Propiedad: "Observaciones Resuelto", Valor: reporte.observacionesResuelto });
        }

        if (reporte.defectosReportados && reporte.defectosReportados.length > 0) {
            data.push({
                Propiedad: "Defectos Reportados",
                Valor: reporte.defectosReportados.map(def =>
                    def.tipoDefecto?.nombre || def.tipoDefectoId || def || "Defecto sin nombre"
                ).join(", ")
            });
        } else {
            data.push({ Propiedad: "Defectos Reportados", Valor: "Sin defectos" });
        }

        const hayDocumentos = reporte.documentos && reporte.documentos.length > 0;
        data.push({ Propiedad: "¿Hay Documentos?", Valor: hayDocumentos ? "Sí" : "No" });

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "DetalleReporte");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, `reporte_${reporte.id}.xlsx`);
        setShowExportMenu(false);
    };

    // Exportar a PDF
    const exportDetalleToPDF = () => {
        if (!reporte) return;

        const doc = new jsPDF();

        // Título centrado
        doc.setFontSize(18);
        doc.setTextColor(41, 128, 185);
        doc.text(`Detalle del Reporte #${reporte.id}`, doc.internal.pageSize.getWidth() / 2, 20, { align: "center" });

        // Subtítulo con fecha de exportación
        doc.setFontSize(11);
        doc.setTextColor(100, 100, 100);
        doc.text(`Exportado: ${new Date().toLocaleString()}`, doc.internal.pageSize.getWidth() / 2, 28, { align: "center" });

        // Datos principales
        const body = [
            ["ID", reporte.id],
            ["Ubicación", reporte.ubicacion],
            ["Fecha de Creación", new Date(reporte.fechaCreacion).toLocaleString()],
            ["Activo", reporte.activo ? "Sí" : "No"],
            ["Observaciones", reporte.observaciones || ""]
        ];

        if (reporte.assetIdEquipo) {
            body.push(["Identificador Equipo", reporte.assetIdEquipo]);
        }

        if (reporte.observacionesResuelto) {
            body.push(["Observaciones Resuelto", reporte.observacionesResuelto]);
        }

        if (reporte.defectosReportados && reporte.defectosReportados.length > 0) {
            body.push([
                "Defectos Reportados",
                reporte.defectosReportados.map(def =>
                    def.tipoDefecto?.nombre || def.tipoDefectoId || def || "Defecto sin nombre"
                ).join(", ")
            ]);
        } else {
            body.push(["Defectos Reportados", "Sin defectos"]);
        }

        const hayDocumentos = reporte.documentos && reporte.documentos.length > 0;
        body.push(["¿Hay Documentos?", hayDocumentos ? "Sí" : "No"]);

        autoTable(doc, {
            startY: 36,
            head: [["Propiedad", "Valor"]],
            body,
            styles: {
                fontSize: 11,
                cellPadding: 4,
                valign: "middle",
            },
            headStyles: {
                fillColor: [41, 128, 185],
                textColor: 255,
                fontStyle: "bold",
                halign: "center",
            },
            bodyStyles: {
                textColor: 50,
            },
            alternateRowStyles: {
                fillColor: [240, 248, 255],
            },
            tableLineColor: [41, 128, 185],
            tableLineWidth: 0.2,
            margin: { left: 18, right: 18 }
        });

        // Pie de página
        doc.setFontSize(9);
        doc.setTextColor(150, 150, 150);
        doc.text("Hermes Handling - Reporte generado automáticamente", doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 10, { align: "center" });

        doc.save(`reporte_${reporte.id}.pdf`);
        setShowExportMenu(false);
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
            <div style={{ position: "relative", display: "inline-block", marginBottom: "16px" }}>
                <button
                    className="btn primary"
                    onClick={() => setShowExportMenu((v) => !v)}
                >
                    Exportar ▼
                </button>
                {showExportMenu && (
                    <div
                        style={{
                            position: "absolute",
                            right: 0,
                            top: "100%",
                            background: "#fff",
                            border: "1px solid #ccc",
                            zIndex: 10,
                            minWidth: "150px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
                        }}
                        onMouseLeave={() => setShowExportMenu(false)}
                    >
                        <button
                            className="btn"
                            style={{ width: "100%", textAlign: "left" }}
                            onClick={exportDetalleToPDF}
                        >
                            Exportar a PDF
                        </button>
                        <button
                            className="btn"
                            style={{ width: "100%", textAlign: "left" }}
                            onClick={exportDetalleToExcel}
                        >
                            Exportar a Excel
                        </button>
                    </div>
                )}
            </div>
            <table className="tabla-detalles">
                <tbody>
                    <tr>
                        <th>ID</th>
                        <td>{reporte.id}</td>
                    </tr>
                    {Object.entries(reporte).map(([key, value]) => {
                        if (
                            key === "id" ||
                            key === "defectosReportados" ||
                            key === "documentos" ||
                            key === "equipo" ||
                            key === "reportesDocumentos" ||
                            key === "assetIdEquipo"
                        ) {
                            return null;
                        }
                        // Oculta la fila si es observacionesResuelto y no hay valor
                        if (key === "observacionesResuelto" && (!value || value === "")) {
                            return null;
                        }
                        return (
                            <tr key={key}>
                                <th>{formatKey(key)}</th>
                                <td>{formatValue(key, value)}</td>
                            </tr>
                        );
                    })}

                    {reporte.assetIdEquipo && (
                        <tr>
                            <th>Identificador Equipo</th>
                            <td>{reporte.assetIdEquipo}</td>
                        </tr>
                    )}
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
            <button className="btn" onClick={() => navigate(-1)} style={{ marginLeft: 8 }}>Volver</button>
        </div>
    );
}

export default VerDetallesReporte;
