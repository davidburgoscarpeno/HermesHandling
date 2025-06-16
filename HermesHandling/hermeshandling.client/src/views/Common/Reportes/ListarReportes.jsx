import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../../../assets/css/AdminApp/ListarReportes.css";

function ListarReportes() {
    const [reportes, setReportes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtroUsuario, setFiltroUsuario] = useState("");
    const [filtroUbicacion, setFiltroUbicacion] = useState("");
    const [filtroActivo, setFiltroActivo] = useState("");
    const [filtroFechaDesde, setFiltroFechaDesde] = useState("");
    const [filtroFechaHasta, setFiltroFechaHasta] = useState("");
    const [showExportMenu, setShowExportMenu] = useState(false);
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
        navigate(`/admin-app/reportes/detalles/${reporte.id}`);
    };

    const handleCrear = () => {
        navigate(`/admin-app/reportes/crear`);
    };

    // Filtrado por usuario, ubicación, activo y fecha de creación
    const reportesFiltrados = reportes.filter((reporte) => {
        const coincideUsuario =
            filtroUsuario === "" ||
            (reporte.usuarioId && reporte.usuarioId.toString().toLowerCase().includes(filtroUsuario.toLowerCase()));
        const coincideUbicacion =
            filtroUbicacion === "" ||
            (reporte.ubicacion && reporte.ubicacion.toLowerCase().includes(filtroUbicacion.toLowerCase()));
        const coincideActivo =
            filtroActivo === "" ||
            (filtroActivo === "true" && reporte.activo === true) ||
            (filtroActivo === "false" && reporte.activo === false);

        // Filtro por fecha de creación
        const fechaCreacion = new Date(reporte.fechaCreacion);
        const desde = filtroFechaDesde ? new Date(filtroFechaDesde) : null;
        const hasta = filtroFechaHasta ? new Date(filtroFechaHasta) : null;
        // Ajuste para incluir todo el día en la fecha hasta
        if (hasta) hasta.setHours(23, 59, 59, 999);
        const coincideFecha =
            (!desde || fechaCreacion >= desde) &&
            (!hasta || fechaCreacion <= hasta);

        return coincideUsuario && coincideUbicacion && coincideActivo && coincideFecha;
    });

    // Exportar a Excel
    const exportToExcel = () => {
        const data = reportesFiltrados.map(r => ({
            ID: r.id,
            Usuario: r.usuarioId,
            Ubicacion: r.ubicacion,
            "Fecha de Creacion": new Date(r.fechaCreacion).toLocaleString(),
            Activo: r.activo ? "Sí" : "No"
        }));
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Reportes");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, "reportes.xlsx");
        setShowExportMenu(false);
    };

    // Exportar a PDF
    const exportToPDF = () => {
        const doc = new jsPDF();
        const columns = [
            { header: "ID", dataKey: "id" },
            { header: "Usuario", dataKey: "usuarioId" },
            { header: "Ubicación", dataKey: "ubicacion" },
            { header: "Fecha de Creación", dataKey: "fechaCreacion" },
            { header: "Activo", dataKey: "activo" }
        ];
        const data = reportesFiltrados.map(r => ({
            ...r,
            fechaCreacion: new Date(r.fechaCreacion).toLocaleString(),
            activo: r.activo ? "Sí" : "No"
        }));
        autoTable(doc, {
            columns,
            body: data,
            styles: { fontSize: 10 },
            headStyles: { fillColor: [41, 128, 185] },
            margin: { top: 20 }
        });
        doc.save("reportes.pdf");
        setShowExportMenu(false);
    };

    return (
        <div className="listar-container">
            <div className="contenido">
                <div className="header d-flex align-items-center gap-2">
                    <h2 className="me-auto">Reportes</h2>
                    <div style={{ position: "relative", display: "inline-block" }}>
                        <button
                            className="btn info"
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
                                    onClick={exportToExcel}
                                >
                                    Exportar a Excel
                                </button>
                                <button
                                    className="btn"
                                    style={{ width: "100%", textAlign: "left" }}
                                    onClick={exportToPDF}
                                >
                                    Exportar a PDF
                                </button>
                            </div>
                        )}
                    </div>
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
                                    <th>Usuario</th>
                                    <th>Ubicaci&oacute;n</th>
                                    <th>Fecha de Creaci&oacute;n</th>
                                    <th>Activo</th>
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
                                            placeholder="Filtrar ubicacion"
                                            value={filtroUbicacion}
                                            onChange={(e) => setFiltroUbicacion(e.target.value)}
                                            className="input"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="date"
                                            value={filtroFechaDesde}
                                            onChange={(e) => setFiltroFechaDesde(e.target.value)}
                                            className="input"
                                            style={{ width: "48%", marginRight: "2%" }}
                                            placeholder="Desde"
                                        />
                                        <input
                                            type="date"
                                            value={filtroFechaHasta}
                                            onChange={(e) => setFiltroFechaHasta(e.target.value)}
                                            className="input"
                                            style={{ width: "48%" }}
                                            placeholder="Hasta"
                                        />
                                    </td>
                                    <td>
                                        <select
                                            value={filtroActivo}
                                            onChange={(e) => setFiltroActivo(e.target.value)}
                                            className="input"
                                        >
                                            <option value="">Todos</option>
                                            <option value="true">Si</option>
                                            <option value="false">No</option>
                                        </select>
                                    </td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {reportesFiltrados.length > 0 ? (
                                    reportesFiltrados.map((reporte) => (
                                        <tr key={reporte.id}>
                                            <td>{reporte.id}</td>
                                            <td>{reporte.usuarioId}</td>
                                            <td>{reporte.ubicacion}</td>
                                            <td>{new Date(reporte.fechaCreacion).toLocaleString()}</td>
                                            <td>
                                                {reporte.activo ? <span>Si</span> : <span>No</span>}
                                            </td>
                                            <td>
                                                <button className="btn info" onClick={() => handleVerDetalles(reporte)}>
                                                    Ver Detalles
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="texto-centrado">No hay reportes que coincidan.</td>
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
