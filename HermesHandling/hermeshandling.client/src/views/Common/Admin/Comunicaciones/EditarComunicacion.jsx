import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../../../../assets/css/AdminApp/CrearDocumentacionInterna.css";

function EditarComunicacion() {
    const { id } = useParams();
    const [titulo, setTitulo] = useState("");
    const [fecha, setFecha] = useState("");
    const [contenido, setContenido] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/AdminCommon/obtener-comunicacion/${id}`);
                const comunicacion = response.data;
                setTitulo(comunicacion.titulo || "");
                setFecha(comunicacion.fecha ? comunicacion.fecha.split("T")[0] : "");
                setContenido(comunicacion.contenido || "");
            } catch (error) {
                console.error("Error al cargar los datos:", error);
                alert("No se pudo cargar la comunicación.");
            }
        };
        cargarDatos();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/api/AdminCommon/editar-comunicacion/${id}`, {
                titulo,
                fecha,
                contenido
            });
            alert("Comunicación actualizada correctamente.");
            navigate("/admin-app/comunicaciones");
        } catch (error) {
            console.error("Error al actualizar la comunicación:", error);
            alert("Hubo un error al actualizar la comunicación.");
        }
    };

    return (
        <div className="crear-container">
            <h2>Editar Comunicación</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Título</label>
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
                <button type="submit" className="btn success">Guardar Cambios</button>
            </form>
        </div>
    );
}

export default EditarComunicacion;