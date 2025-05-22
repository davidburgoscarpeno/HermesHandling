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

            {/* Título y formulario */}
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
