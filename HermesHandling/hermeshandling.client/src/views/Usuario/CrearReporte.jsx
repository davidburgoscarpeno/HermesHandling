import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/images/hermes-og.png"; // Ajusta la ruta si es necesario
import "../../assets/css/Usuario/CrearReporteUsuario.css";

function CrearReporte() {
    const [equipos, setEquipos] = useState([]);
    const [tiposDefecto, setTiposDefecto] = useState([]);
    const [mensajeExito, setMensajeExito] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const [busquedaEquipo, setBusquedaEquipo] = useState("");
    const [showSugerencias, setShowSugerencias] = useState(false);
    const sugerenciasRef = useRef(null);
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

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/UserCommon/tipos-defectos`)
            .then((res) => setTiposDefecto(Array.isArray(res.data) ? res.data : []))
            .catch(() => setTiposDefecto([]));
    }, []);

    // Cerrar menú al hacer click fuera
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
            if (sugerenciasRef.current && !sugerenciasRef.current.contains(event.target)) {
                setShowSugerencias(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogoClick = () => setMenuOpen((open) => !open);

    const handleDocumentacion = () => {
        navigate("/usuario/ver-documentacion-interna");
    };

    const handleComunicados = () => {
        navigate("/usuario/ver-comunicaciones");
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        navigate("/login");
    };

    const handleCrearReporte = () => {
        navigate("/usuario/crear-reporte");
    };

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
                navigate("/usuario");
            }, 2000);
        } catch (error) {
            console.error("Error al guardar el reporte:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="crear-reporte-form">
            {/* Cabecera con logo, menú y botón */}
            <div className="kanban-header">
                <div className="kanban-header-left" style={{ position: "relative" }}>
                    <img
                        src={logo}
                        alt="Logo"
                        className="kanban-logo"
                        onClick={handleLogoClick}
                        style={{ cursor: "pointer" }}
                    />
                    <h2>Crear Reporte</h2>
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
            </div>

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
                        className="sugerencias-equipos"
                        style={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            zIndex: 10,
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
