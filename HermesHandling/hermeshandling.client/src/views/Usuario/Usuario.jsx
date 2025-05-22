import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/images/hermes-og.png";
import "../../assets/css/Usuario/Usuario.css";

function Usuario() {
    const [reportes, setReportes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem("usuario"));
    const navigate = useNavigate();
    const menuRef = useRef(null);

    useEffect(() => {
        if (!user?.idUsuario) return;
        axios.get(`${import.meta.env.VITE_API_URL}/api/UserCommon/reportes-usuario/${user.idUsuario}`)
            .then(res => setReportes(Array.isArray(res.data) ? res.data : []))
            .catch(() => setReportes([]))
            .finally(() => setLoading(false));
    }, [user]);

    // Cierra el menú al hacer clic fuera
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }
        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuOpen]);

    const handleCrearReporte = () => {
        navigate("/usuario/crear-reporte");
    };

    const handleLogoClick = () => {
        setMenuOpen((open) => !open);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        navigate("/login");
    };

    const handleComunicados = () => {
        navigate("/usuario/ver-comunicaciones");
    };

    const handleDocumentacion = () => {
        navigate("/usuario/ver-documentacion-interna");
    };

    // Nuevo: Navegar a detalles del reporte
    const handleVerDetalle = (id) => {
        navigate(`/usuario/ver-reporte/${id}`);
    };

    // Agrupa los reportes por estado
    const abiertos = reportes.filter(r => r.activo);
    const resueltos = reportes.filter(r => !r.activo);

    return (
        <div className="usuario-kanban-container">
            <div className="kanban-header">
                <div className="kanban-header-left" style={{ position: "relative" }}>
                    <img
                        src={logo}
                        alt="Logo"
                        className="kanban-logo"
                        onClick={handleLogoClick}
                        style={{ cursor: "pointer" }}
                    />
                    <h2>Mis Reportes</h2>
                    {menuOpen && (
                        <div className="logo-dropdown-menu" ref={menuRef}>
                            <button onClick={handleDocumentacion} className="dropdown-item">
                                <i className="bi bi-journal-text"></i> Documentaci&oacute;n Interna
                            </button>
                            <button onClick={handleComunicados} className="dropdown-item">
                                <i className="bi bi-megaphone"></i> Comunicados
                            </button>
                            <button onClick={handleLogout} className="dropdown-item">
                                <i className="bi bi-box-arrow-right"></i> Cerrar sesi&oacute;n
                            </button>
                        </div>
                    )}
                </div>
                <button className="btn-create" onClick={handleCrearReporte}>
                    <i className="bi bi-plus-circle"></i> Crear reporte
                </button>
            </div>
            {loading ? (
                <p>Cargando reportes...</p>
            ) : (
                <div className="kanban-board">
                    <div className="kanban-column">
                        <div className="kanban-column-title abierto">Abiertos</div>
                        {abiertos.length > 0 ? (
                            abiertos.map(r => (
                                <div
                                    className="kanban-card"
                                    key={r.id}
                                    onClick={() => handleVerDetalle(r.id)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <div className="kanban-card-title">
                                        {r.assetIdEquipo || r.equipoId}
                                    </div>
                                    <div className="kanban-card-date">
                                        {r.fechaCreacion ? new Date(r.fechaCreacion).toLocaleDateString() : ""}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="kanban-card empty">No tienes reportes abiertos.</div>
                        )}
                    </div>
                    <div className="kanban-column">
                        <div className="kanban-column-title resuelto">Resueltos</div>
                        {resueltos.length > 0 ? (
                            resueltos.map(r => (
                                <div
                                    className="kanban-card"
                                    key={r.id}
                                    onClick={() => handleVerDetalle(r.id)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <div className="kanban-card-title">
                                        {r.assetIdEquipo || r.equipoId}
                                    </div>
                                    <div className="kanban-card-date">
                                        {r.fechaCreacion ? new Date(r.fechaCreacion).toLocaleDateString() : ""}
                                    </div>
                                    <div className="kanban-card-obs">
                                        {r.observaciones}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="kanban-card empty">No tienes reportes resueltos.</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Usuario;
