import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../../assets/css/AdminApp/CrearComunicacion.css";

function CrearComunicacion() {
    const [titulo, setTitulo] = useState("");
    const [fecha, setFecha] = useState("");
    const [contenido, setContenido] = useState("");
    const [mensajeExito, setMensajeExito] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/AdminCommon/crear-comunicacion`, {
                asunto: titulo,
                mensaje: contenido,
                fechaPublicacion: fecha
            });
            setMensajeExito("Comunicación creada correctamente.");
            setTitulo("");
            setFecha("");
            setContenido("");
            setTimeout(() => {
                navigate("/admin-app/comunicaciones");
            }, 1500);
        } catch (error) {
            console.error("Error al crear la comunicación:", error);
            setMensajeExito(""); // Oculta mensaje de éxito si hay error
            alert("Hubo un error al crear la comunicación.");
        }
    };

    return (
        <div className="crear-container">
            <h2>Nueva Comunicaci&oacute;n</h2>
            {mensajeExito && (
                <div className="alert-success">
                    {mensajeExito}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>T&iacute;tulo</label>
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                        className="input"
                    />
                </div>
                <div className="form-group">
                    <label>Fecha</label>
                    <input
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        required
                        className="input"
                    />
                </div>
                <div className="form-group">
                    <label>Contenido</label>
                    <textarea
                        value={contenido}
                        onChange={(e) => setContenido(e.target.value)}
                        required
                        className="input"
                    />
                </div>
                <button type="submit" className="btn success">Crear</button>
            </form>
        </div>
    );
}

export default CrearComunicacion;

