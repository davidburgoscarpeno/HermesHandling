import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/images/hermes-og.png"; // Ajusta la ruta si es necesario
import "../../assets/css/Usuario/VerComunicados.css";

function VerComunicados() {
    const [comunicados, setComunicados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        setError("");
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/UserCommon/listar-comunicaciones`)
            .then(res => {
                setComunicados(Array.isArray(res.data) ? res.data : []);
            })
            .catch(() => setError("No se pudieron cargar los comunicados."))
            .finally(() => setLoading(false));
    }, []);

    // Cerrar menú al hacer click fuera
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
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    const handleLogoClick = () => setMenuOpen((open) => !open);

    const handleInicio = () => {
        navigate("/usuario");
    };

    const handleComunicados = () => {
        navigate("/usuario/ver-comunicaciones");
    };

    const handleDocumentacion = () => {
        navigate("/usuario/ver-documentacion-interna");
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        navigate("/login");
    };

    return (
        <div className="comunicados-root">
            <div className="kanban-header-left" style={{ position: "relative" }}>
                <img
                    src={logo}
                    alt="Logo"
                    className="kanban-logo"
                    onClick={handleLogoClick}
                    style={{ cursor: "pointer" }}
                />
                <h2 className="comunicados-title">Comunicados</h2>
                {menuOpen && (
                    <div className="logo-dropdown-menu" ref={menuRef}>
                        <button onClick={handleInicio} className="dropdown-item">
                            <i className="bi bi-house"></i> Inicio
                        </button>
                        <button onClick={handleDocumentacion} className="dropdown-item">
                            <i className="bi bi-journal-text"></i> Documentaci&oacute;n Interna
                        </button>
                        <button onClick={handleLogout} className="dropdown-item">
                            <i className="bi bi-box-arrow-right"></i> Cerrar sesi&oacute;n
                        </button>
                    </div>
                )}
            </div>
            {loading && <p>Cargando comunicados...</p>}
            {error && <div className="comunicados-error">{error}</div>}
            <div className="comunicados-list">
                {comunicados.length === 0 && !loading && !error && (
                    <div className="comunicados-empty">No hay comunicados disponibles.</div>
                )}
                {comunicados.map((c, idx) => (
                    <div className="comunicado-card" key={c.id || idx}>
                        <div className="comunicado-asunto">{c.asunto}</div>
                        <div className="comunicado-fecha">
                            {c.fechaPublicacion ? new Date(c.fechaPublicacion).toLocaleDateString() : ""}
                        </div>
                        <div className="comunicado-mensaje">{c.mensaje}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default VerComunicados;
