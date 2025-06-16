import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/images/hermes-og.png";
import "../../assets/css/Usuario/VerDocumentacionInterna.css";

function VerDocumentacionInterna() {
    const [documentos, setDocumentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        setError("");
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/AdminCommon/listar-documentacion-interna`)
            .then(res => {
                setDocumentos(Array.isArray(res.data) ? res.data : []);
            })
            .catch(() => {
                setError("No se pudo cargar la documentaci&oacute;n interna.");
            })
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

    const handleLogoClick = () => setMenuOpen(open => !open);

    const handleInicio = () => {
        navigate("/usuario");
    };



    const handleComunicados = () => {
        navigate("/usuario/ver-comunicaciones");
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        navigate("/login");
    };

    return (
        <div className="documentacion-interna-container">
            <div className="kanban-header-left" style={{ position: "relative" }}>
                <img
                    src={logo}
                    alt="Logo"
                    className="kanban-logo"
                    onClick={handleLogoClick}
                    style={{ cursor: "pointer" }}
                />
                <h2>Documentaci&oacute;n Interna</h2>
                {menuOpen && (
                    <div className="logo-dropdown-menu" ref={menuRef}>
                        <button onClick={handleInicio} className="dropdown-item">
                            <i className="bi bi-house"></i> Inicio
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
            {loading && <p>Cargando documentaci&oacute;n...</p>}
            {error && <div className="register-error">{error}</div>}
            {!loading && !error && (
                <ul className="documentos-lista">
                    {documentos.length === 0 && (
                        <li className="documento-item">No hay documentos disponibles.</li>
                    )}
                    {documentos.map((doc, idx) => (
                        <li key={idx} className="documento-item">
                            <span>{doc.nombre}</span>
                            <span>
                                {doc.fechaAlta
                                    ? new Date(doc.fechaAlta).toLocaleDateString("es-ES", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric"
                                    })
                                    : ""}
                            </span>
                            <a
                                href={`${import.meta.env.VITE_API_URL}/api/UserCommon/descargar-documento-interno?id=${doc.id}`}
                                className="btn-descargar"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Descargar PDF
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default VerDocumentacionInterna;
