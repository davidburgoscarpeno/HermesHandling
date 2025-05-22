import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();

    useEffect(() => {
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
                `${import.meta.env.VITE_API_URL}/api/AdminCommon/crear-equipo`,
                {
                    assetId: form.assetId,
                    nombre: form.nombre,
                    descripcion: form.descripcion,
                    tipoEquipoId: form.tipoEquipoId ? parseInt(form.tipoEquipoId) : null,
                    estado: form.estado,
                    fechaUltimaRevision: form.fechaUltimaRevision || null
                }
            );
            setMensajeExito("Equipo creado con exito.");
            setTimeout(() => {
                navigate("/admin-app/equipos/listar-equipos");
            }, 1200);
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
                    <option value="">Selecciona un estado</option>
                    <option value="Operativo">Operativo</option>
                    <option value="En mantenimiento">En mantenimiento</option>
                    <option value="En revisión">En revisi&oacute;n</option>
                </select>
            </div>
            <div>
                <label>Fecha &Uacute;ltima Revisi&oacute;n</label>
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
