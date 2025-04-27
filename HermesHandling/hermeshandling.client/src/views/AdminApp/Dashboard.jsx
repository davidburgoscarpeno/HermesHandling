import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";
import SidebarAdminApp from "../../components/SideBarAdminApp";
import "../../assets/css/AdminApp/Dashboard.css"; // Asegúrate de agregar estos estilos en el archivo CSS

function Dashboard() {
    const [resumen, setResumen] = useState(null);
    const [graficoData, setGraficoData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resumenRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/AdminApp/dashboard/resumen`);
                setResumen(resumenRes.data);

                const graficoRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/AdminApp/dashboard/usuarios-por-dia`);
                setGraficoData(graficoRes.data);
            } catch (err) {
                console.error("Error al cargar datos del dashboard:", err);
            }
        };

        fetchData();
    }, []);

    if (!resumen) return <p>Cargando...</p>;

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Dashboard</h2>

            <div className="row">
                <div className="col-md-3 mb-4">
                    <div className="card shadow-lg border-primary">
                        <div className="card-body">
                            <h5 className="card-title text-primary">Usuarios Totales</h5>
                            <p className="card-text">{resumen.totalUsuarios}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card shadow-lg border-success">
                        <div className="card-body">
                            <h5 className="card-title text-success">Activos Hoy</h5>
                            <p className="card-text">{resumen.usuariosActivos}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card shadow-lg border-info">
                        <div className="card-body">
                            <h5 className="card-title text-info">Nuevos esta semana</h5>
                            <p className="card-text">{resumen.nuevosSemana}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card shadow-lg border-dark">
                        <div className="card-body">
                            <h5 className="card-title text-dark">Admins</h5>
                            <p className="card-text">{resumen.admins}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card shadow-lg">
                <div className="card-body">
                    <h5 className="card-title mb-4">Actividad de usuarios esta semana</h5>
                    <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={graficoData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis className="dia" dataKey="dia" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="cantidad" stroke="#007bff" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
