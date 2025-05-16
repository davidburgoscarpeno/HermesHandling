import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import "../../../../assets/css/AdminApp/CrearDocumentacionInterna.css";

const EditarDocumentacion = () => {
    const [nombre, setNombre] = useState('');
    const [archivoDocumento, setArchivoDocumento] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();
    const { id } = useParams(); // Obtener el ID del documento desde la URL

    // Cargar los datos del documento existente
    useEffect(() => {
        console.log("ID recibido:", id);
        const cargarDatos = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/AdminCommon/obtener-documentacion-interna/${id}`
                );
                const { nombre, pathDocumento } = response.data;

                setNombre(nombre);
                setMensaje('');
            } catch (error) {
                console.error('Error al cargar los datos:', error);
                setMensaje('Error al cargar los datos del documento');
            }
        };

        cargarDatos();
    }, [id]);
0

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombre) {
            setMensaje('El nombre del documento es obligatorio');
            return;
        }

        const allowedExtensions = ['.pdf', '.docx'];
        if (archivoDocumento) {
            const ext = archivoDocumento.name.split('.').pop().toLowerCase();
            if (!allowedExtensions.includes(`.${ext}`)) {
                setMensaje('Solo se permiten archivos PDF o DOCX');
                return;
            }
        }

        const formData = new FormData();
        formData.append('Nombre', nombre);
        if (archivoDocumento) {
            formData.append('Documento', archivoDocumento);
        }

        try {
            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/api/AdminCommon/editar-documentacion-interna/${id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            setMensaje('Documento actualizado correctamente');
            setTimeout(() => {
                navigate('/admin-app/documentacion-interna');
            }, 2000);
        } catch (error) {
            console.error('Error al enviar:', error);
            setMensaje('Error al actualizar la documentación');
        }
    };

    const handleVolver = () => {
        navigate('/admin-app/documentacion-interna'); // Redirige a la lista de documentación interna
    };

    return (
        <div className="crear-documentacion-container">
            <h2>Editar Documentaci&oacute;n Interna</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nombre del Documento:</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                        placeholder="Ej: PRL"
                    />
                </div>

                <div className="form-group">
                    <label>Subir Nuevo Archivo (opcional, .pdf o .docx):</label>
                    <input
                        type="file"
                        accept=".pdf,.docx"
                        onChange={(e) => setArchivoDocumento(e.target.files[0])}
                    />
                </div>

                {mensaje && <p className="mensaje">{mensaje}</p>}

                <button className="btn-guardar" type="submit">Actualizar</button>
            </form>

            {/* Botón Volver */}
            <button className="btn-volver" onClick={handleVolver}>
                Volver
            </button>
        </div>
    );
};

export default EditarDocumentacion;
