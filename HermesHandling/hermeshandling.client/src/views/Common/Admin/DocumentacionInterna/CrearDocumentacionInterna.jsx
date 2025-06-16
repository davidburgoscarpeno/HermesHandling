import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "../../../../assets/css/AdminApp/CrearDocumentacionInterna.css";

const CrearDocumentacion = () => {
    const [nombre, setNombre] = useState('');
    const [archivoDocumento, setArchivoDocumento] = useState(null);
    const [mensaje, setMensaje] = useState(''); 
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('usuario'));


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombre || !archivoDocumento) {
            setMensaje('Todos los campos son obligatorios');
            return;
        }

        const allowedExtensions = ['.pdf', '.docx'];
        const ext = archivoDocumento.name.split('.').pop().toLowerCase();
        if (!allowedExtensions.includes(`.${ext}`)) {
            setMensaje('Solo se permiten archivos PDF o DOCX');
            return;
        }

        const formData = new FormData();
        formData.append('Nombre', nombre); 
        formData.append('Documento', archivoDocumento); 
        formData.append('IdAlta', user.idUsuario);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/AdminCommon/crear-documentacion-interna`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            setMensaje('Documento subido correctamente');
            setNombre('');
            setArchivoDocumento(null);

            // Redirigir después de 2 segundos
            setTimeout(() => {
                navigate('/admin-app/documentacion-interna');
            }, 2000);
        } catch (error) {
            console.error('Error al enviar:', error);
            setMensaje('Error al guardar la documentación');
        }
    };

    return (
        <div className="crear-documentacion-container">
            <h2>Crear Nueva Documentaci&oacute;n Interna</h2>
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
                    <label>Subir Archivo (.pdf o .docx):</label>
                    <input
                        type="file"
                        accept=".pdf,.docx"
                        onChange={(e) => setArchivoDocumento(e.target.files[0])}
                        required
                    />
                </div>

                {mensaje && <p className="mensaje">{mensaje}</p>}

                <button className="btn-guardar" type="submit">Guardar</button>
            </form>
        </div>
    );
};

export default CrearDocumentacion;
