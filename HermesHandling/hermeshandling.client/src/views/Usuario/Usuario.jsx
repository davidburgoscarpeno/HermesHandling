import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/css/Usuario/Usuario.css";

function Usuario() {
    const [reportes, setReportes] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem("usuario"));
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.idUsuario) return;
        axios.get(`${import.meta.env.VITE_API_URL}/api/UserCommon/reportes-usuario/${user.idUsuario}`)
            .then(res => setReportes(Array.isArray(res.data) ? res.data : []))
            .catch(() => setReportes([]))
            .finally(() => setLoading(false));
    }, [user]);

    const handleCrearReporte = () => {
        navigate("/usuario/crear-reporte");
    };

    // Agrupa los reportes por estado
    const abiertos = reportes.filter(r => r.activo);
    const resueltos = reportes.filter(r => !r.activo);

    return (
        <div className="usuario-kanban-container">
            <div className="kanban-header">
                <h2>Mis Reportes</h2>
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
                                <div className="kanban-card" key={r.id}>
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
                            <div className="kanban-card empty">No tienes reportes abiertos.</div>
                        )}
                    </div>
                    <div className="kanban-column">
                        <div className="kanban-column-title resuelto">Resueltos</div>
                        {resueltos.length > 0 ? (
                            resueltos.map(r => (
                                <div className="kanban-card" key={r.id}>
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

