import { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/Usuario/VerComunicados.css";

function VerComunicados() {
    const [comunicados, setComunicados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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

    return (
        <div className="comunicados-root">
            <h2 className="comunicados-title">Comunicados</h2>
            {loading && <p>Cargando comunicados...</p>}
            {error && <div className="comunicados-error">{error}</div>}
            <div className="comunicados-list">
                {comunicados.length === 0 && !loading && !error && (
                    <div className="comunicados-empty">No hay comunicados disponibles.</div>
                )}
                {comunicados.map((c, idx) => (
                    <div className="comunicado-card" key={c.id || idx}>
                        <div className="comunicado-asunto">{c.asunto}</div>
                        <div className="comunicado-mensaje">{c.mensaje}</div>
                        <div className="comunicado-fecha">
                            {c.fecha ? new Date(c.fecha).toLocaleDateString() : ""}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default VerComunicados;
