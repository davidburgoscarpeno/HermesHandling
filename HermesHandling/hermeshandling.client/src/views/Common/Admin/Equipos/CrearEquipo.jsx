import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../../assets/css/AdminApp/CrearEquipo.css";

function CrearEquipo() {
    const [tiposEquipo, setTiposEquipo] = useState([]);
    const [mensajeExito, setMensajeExito] = useState("");
    const [form, setForm] = useState({
        assetId: "",
        nombre: "",
        descripcion: "",
        tipoEquipoId: "",
        estado: "",
        fechaCreacion: new Date().toISOString().slice(0, 16),
        fechaUltimaRevision: ""
    });

    useEffect(() => {
        // Cargar tipos de equipo si tienes endpoint
        axios.get(`${import.meta.env.VITE_API_URL}/api/AdminCommon/tipos-equipo`)
            .then(res => setTiposEquipo(Array.isArray(res.data) ? res.data : []))
            .catch(() => setTiposEquipo([]));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensajeExito("");
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/UserCommon/crear-equipo`,
                {
                    assetId: form.assetId,
                    nombre: form.nombre,
                    descripcion: form.descripcion,
                    tipoEquipoId: form.tipoEquipoId ? parseInt(form.tipoEquipoId) : null,
                    estado: form.estado,
                    fechaCreacion: form.fechaCreacion,
                    fechaUltimaRevision: form.fechaUltimaRevision || null
                }
            );
            setMensajeExito("Equipo creado con éxito.");
            setForm({
                assetId: "",
                nombre: "",
                descripcion: "",
                tipoEquipoId: "",
                estado: "",
                fechaCreacion: new Date().toISOString().slice(0, 16),
                fechaUltimaRevision: ""
            });
        } catch (error) {
            setMensajeExito("Error al crear el equipo.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="crear-equipo-form">
            <h3>Crear Equipo</h3>
            {mensajeExito && <div className="mensaje-exito">{mensajeExito}</div>}
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
                <label>Descripción</label>
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
                <input
                    type="text"
                    name="estado"
                    value={form.estado}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Fecha de Creación</label>
                <input
                    type="datetime-local"
                    name="fechaCreacion"
                    value={form.fechaCreacion}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Fecha Última Revisión</label>
                <input
                    type="datetime-local"
                    name="fechaUltimaRevision"
                    value={form.fechaUltimaRevision}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Crear</button>
        </form>
    );
}

export default CrearEquipo;
