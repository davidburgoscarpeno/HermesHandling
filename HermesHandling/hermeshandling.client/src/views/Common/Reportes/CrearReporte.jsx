import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../assets/css/AdminApp/CrearReporte.css"

function CrearReporte() {
    const [equipos, setEquipos] = useState([]);
    const [tiposDefecto, setTiposDefecto] = useState([]);
    const [mensajeExito, setMensajeExito] = useState("");
    const navigate = useNavigate();
    const [form, setForm] = useState({
        equipoId: "",
        usuarioId: "",
        ubicacion: "",
        observaciones: "",
        fechaCreacion: new Date().toISOString().slice(0, 16),
        tipoDefectoId: "",
        documentos: []
    });
    const user = JSON.parse(localStorage.getItem("usuario"));

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/UserCommon/equipos`)
            .then((res) => setEquipos(Array.isArray(res.data) ? res.data : []))
            .catch(() => setEquipos([]));
        axios.get(`${import.meta.env.VITE_API_URL}/api/UserCommon/tipos-defectos`)
            .then((res) => setTiposDefecto(Array.isArray(res.data) ? res.data : []))
            .catch(() => setTiposDefecto([]));
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "documentos") {
            setForm({ ...form, documentos: files });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensajeExito("");
        try {
         const formData = new FormData();
formData.append("EquipoId", form.equipoId);
formData.append("UsuarioId", user.idUsuario);
formData.append("Ubicacion", form.ubicacion);
formData.append("Observaciones", form.observaciones);
formData.append("TipoDefectoId", form.tipoDefectoId ? form.tipoDefectoId : 0);
for (let i = 0; i < form.documentos.length; i++) {
    formData.append("Documentos", form.documentos[i]);
}

            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/UserCommon/crear-reporte`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            setMensajeExito("Reporte creado con exito.");
            setForm({
                equipoId: "",
                usuarioId: "",
                ubicacion: "",
                observaciones: "",
                fechaCreacion: new Date().toISOString().slice(0, 16),
                tipoDefectoId: "",
                documentos: []
            });
            setTimeout(() => {
                setMensajeExito("");
                navigate("/Admin-App/reportes/listar-reportes");
            }, 2000);
        } catch (error) {
            console.error("Error al guardar el reporte:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="crear-reporte-form">
            <h3>Crear Reporte</h3>
            {mensajeExito && (
                <div className="mensaje-exito">{mensajeExito}</div>
            )}
            <div>
                <label>Equipo</label>
                <select
                    name="equipoId"
                    value={form.equipoId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecciona un equipo</option>
                    {equipos.map((equipo) => (
                        <option key={equipo.id} value={equipo.id}>
                            {equipo.assetId || equipo.asset_id || `Equipo ${equipo.id}`}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Usuario ID</label>
                <input
                    type="text"
                    name="usuarioId"
                    value={user.idUsuario}
                    readOnly
                />
            </div>
            <div>
                <label>Ubicaci&oacute;n</label>
                <input
                    type="text"
                    name="ubicacion"
                    value={form.ubicacion}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Observaciones</label>
                <textarea
                    name="observaciones"
                    value={form.observaciones}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Fecha de creaci&oacute;n</label>
                <input
                    type="datetime-local"
                    name="fechaCreacion"
                    value={form.fechaCreacion}
                    readOnly
                />
            </div>
            <div>
                <label>Tipo de Defecto</label>
                <select
                    name="tipoDefectoId"
                    value={form.tipoDefectoId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecciona un tipo de defecto</option>
                    {tiposDefecto.map((def) => (
                        <option key={def.id} value={def.id}>
                            {def.nombre}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Documentos</label>
                <input
                    type="file"
                    name="documentos"
                    multiple
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Crear</button>
        </form>
    );
}

export default CrearReporte;
