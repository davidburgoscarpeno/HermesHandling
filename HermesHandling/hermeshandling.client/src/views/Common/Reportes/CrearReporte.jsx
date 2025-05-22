import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../assets/css/AdminApp/CrearReporte.css"

function CrearReporte() {
    const [equipos, setEquipos] = useState([]);
    const [tiposDefecto, setTiposDefecto] = useState([]);
    const [mensajeExito, setMensajeExito] = useState("");
    const [busquedaEquipo, setBusquedaEquipo] = useState("");
    const [showSugerencias, setShowSugerencias] = useState(false);
    const [form, setForm] = useState({
        equipoId: "",
        usuarioId: "",
        ubicacion: "",
        observaciones: "",
        fechaCreacion: new Date().toISOString().slice(0, 16),
        tipoDefectoId: "",
        documentos: []
    });
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("usuario"));
    const sugerenciasRef = useRef(null);

    // Buscar equipos en el backend cada vez que cambia la búsqueda
    useEffect(() => {
        if (busquedaEquipo.trim() === "") {
            setEquipos([]);
            return;
        }
        const delayDebounce = setTimeout(() => {
            axios.get(`${import.meta.env.VITE_API_URL}/api/UserCommon/equipos`, {
                params: { search: busquedaEquipo }
            })
            .then((res) => setEquipos(Array.isArray(res.data) ? res.data : []))
            .catch(() => setEquipos([]));
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [busquedaEquipo]);

    // Cargar tipos de defecto una sola vez
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/UserCommon/tipos-defectos`)
            .then((res) => setTiposDefecto(Array.isArray(res.data) ? res.data : []))
            .catch(() => setTiposDefecto([]));
    }, []);

    // Cerrar sugerencias al hacer click fuera
    useEffect(() => {
        function handleClickOutside(event) {
            if (sugerenciasRef.current && !sugerenciasRef.current.contains(event.target)) {
                setShowSugerencias(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "documentos") {
            setForm({ ...form, documentos: files });
        } else if (name === "busquedaEquipo") {
            setBusquedaEquipo(value);
            setShowSugerencias(true);
            setForm({ ...form, equipoId: "" }); // Limpiar selección previa
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSugerenciaClick = (equipo) => {
        setBusquedaEquipo(equipo.assetId || equipo.asset_id || `Equipo ${equipo.id}`);
        setForm({ ...form, equipoId: equipo.id });
        setShowSugerencias(false);
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
            setBusquedaEquipo("");
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
            <div style={{ position: "relative" }}>
                <label>Equipo</label>
                <input
                    type="text"
                    name="busquedaEquipo"
                    placeholder="Buscar equipo..."
                    value={busquedaEquipo}
                    onChange={handleChange}
                    autoComplete="off"
                    onFocus={() => setShowSugerencias(true)}
                    style={{ marginBottom: "8px", width: "100%" }}
                />
                {showSugerencias && equipos.length > 0 && (
                    <ul
                        ref={sugerenciasRef}
                        style={{
                            position: "absolute",
                            top: "100%", // <-- Esto asegura que salga debajo del input
                            left: 0,
                            zIndex: 10,
                            background: "#fff",
                            border: "1px solid #ccc",
                            width: "100%",
                            maxHeight: "180px",
                            overflowY: "auto",
                            listStyle: "none",
                            margin: 0,
                            padding: 0
                        }}
                    >
                        {equipos.map((equipo) => (
                            <li
                                key={equipo.id}
                                style={{
                                    padding: "8px",
                                    cursor: "pointer",
                                    borderBottom: "1px solid #eee"
                                }}
                                onClick={() => handleSugerenciaClick(equipo)}
                            >
                                {equipo.assetId || equipo.asset_id || `Equipo ${equipo.id}`}
                            </li>
                        ))}
                    </ul>
                )}
                {/* Campo oculto para enviar el id del equipo */}
                <input type="hidden" name="equipoId" value={form.equipoId} />
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
            <button type="submit" disabled={!form.equipoId}>Crear</button>
        </form>
    );
}

export default CrearReporte;
