import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../../assets/css/AdminApp/CrearEquipo.css";

function EditarEquipo() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tiposEquipo, setTiposEquipo] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const [form, setForm] = useState({
        assetId: "",
        nombre: "",
        descripcion: "",
        tipoEquipoId: "",
        estado: ""
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Cargar tipos de equipo
        axios.get(`${import.meta.env.VITE_API_URL}/api/AdminCommon/tipos-equipo`)
            .then(res => setTiposEquipo(Array.isArray(res.data) ? res.data : []))
            .catch(() => setTiposEquipo([]));
        // Cargar datos del equipo
        axios.get(`${import.meta.env.VITE_API_URL}/api/AdminCommon/equipos/${id}`)
            .then(res => {
                const equipo = res.data;
                setForm({
                    assetId: equipo.assetId || "",
                    nombre: equipo.nombre || "",
                    descripcion: equipo.descripcion || "",
                    tipoEquipoId: equipo.tipoEquipoId ? equipo.tipoEquipoId.toString() : "",
                    estado: equipo.estado || ""
                });
            })
            .catch(() => setMensaje("Error al cargar el equipo."))
            .finally(() => setLoading(false));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje("");
        try {
            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/AdminCommon/editar-equipo/${id}`,
                {
                    id, // <-- Añade esta línea
                    assetId: form.assetId,
                    nombre: form.nombre,
                    descripcion: form.descripcion,
                    tipoEquipoId: form.tipoEquipoId ? parseInt(form.tipoEquipoId) : null,
                    estado: form.estado
                }
            );
            setMensaje("Equipo actualizado con éxito.");
            setTimeout(() => {
                navigate("/admin-app/equipos/listar-equipos");
            }, 1500);
        } catch (error) {
            setMensaje("Error al actualizar el equipo.");
        }
    };


    if (loading) {
        return <div className="crear-equipo-form"><p>Cargando equipo...</p></div>;
    }

    return (
        <form onSubmit={handleSubmit} className="crear-equipo-form">
            <h3>Editar Equipo</h3>
            {mensaje && <div className="mensaje-exito">{mensaje}</div>}
            <div>
                <label>Asset ID</label>
                <input
                    type="text"
                    name="assetId"
                    value={form.assetId}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Descripci&oacute;n</label>
                <textarea
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Tipo de Equipo</label>
                <select
                    name="tipoEquipoId"
                    value={form.tipoEquipoId}
                    onChange={handleChange}
                >
                    <option value="">Selecciona un tipo</option>
                    {tiposEquipo.map((tipo) => (
                        <option key={tipo.id} value={tipo.id}>
                            {tipo.nombre}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Estado</label>
                <select
                    name="estado"
                    value={form.estado}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecciona estado</option>
                    <option value="Operativo">Operativo</option>
                    <option value="En mantenimiento">En Mantenimiento</option>
                </select>
            </div>
            <button type="submit">Guardar Cambios</button>
        </form>
    );
}

export default EditarEquipo;
