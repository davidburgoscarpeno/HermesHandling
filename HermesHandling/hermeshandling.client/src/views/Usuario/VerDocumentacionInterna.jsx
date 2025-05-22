import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/images/hermes-og.png";
import "../../assets/css/Usuario/VerDocumentacionInterna.css";

function VerDocumentacionInterna() {
    const [documentos, setDocumentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
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

    const handleVolver = () => {
        navigate(-1);
    };

    const handleLogoClick = () => {
        navigate("/usuario");
    };

    return (
        <div className="documentacion-interna-container">
            <div className="doc-header">
                <img
                    src={logo}
                    alt="Logo"
                    className="doc-logo"
                    onClick={handleLogoClick}
                    style={{ cursor: "pointer", height: "40px", marginRight: "18px" }}
                />
                
            </div>
            <h2>Documentaci&oacute;n Interna</h2>
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
