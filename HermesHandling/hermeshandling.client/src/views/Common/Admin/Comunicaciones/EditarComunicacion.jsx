import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../../../../assets/css/AdminApp/CrearDocumentacionInterna.css";

function EditarComunicacion() {
    const { id } = useParams();
    const [titulo, setTitulo] = useState("");
    const [fecha, setFecha] = useState("");
    const [contenido, setContenido] = useState("");
    const [success, setSuccess] = useState(""); // Nuevo estado para el mensaje de éxito
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('usuario'));

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/AdminCommon/obtener-comunicacion/${id}`);
                const comunicacion = response.data;
                setTitulo(comunicacion.asunto || "");
                setFecha(comunicacion.fechaPublicacion ? comunicacion.fechaPublicacion.split("T")[0] : "");
                setContenido(comunicacion.mensaje || "");
            } catch (error) {
                console.error("Error al cargar los datos:", error);
                setError("No se pudo cargar la comunicación.");
            }
        };
        cargarDatos();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/api/AdminCommon/editar-comunicacion/${id}`, {
                asunto: titulo,
                mensaje: contenido,
                fechaPublicacion: fecha,
                idUsuarioModificacion: user.idUsuario
            });
            setSuccess("Comunicacion actualizada correctamente.");
            setTimeout(() => {
                navigate("/admin-app/comunicaciones");
            }, 1500); // Redirige después de 1.5 segundos
        } catch (error) {
            console.error("Error al actualizar la comunicación:", error);
            setError("Hubo un error al actualizar la comunicación.");
        }
    };


    return (
        <div className="crear-container">
            <h2>Editar Comunicaci&oacute;n</h2>
            {success && <div className="success-message">{success}</div>}
            {error && <div className="error-message">{error}</div>}
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
                <button type="submit" className="btn success">Guardar Cambios</button>
            </form>
        </div>
    );
}

export default EditarComunicacion;
