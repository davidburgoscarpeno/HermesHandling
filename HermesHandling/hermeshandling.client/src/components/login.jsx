import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/images/logo.png'; // Asegúrate que la ruta sea correcta

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        axios.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        const user = { email, password };
        try {
            const response = await axios.post("http://localhost:5271/api/auth/login", user);
            console.log(response.data);
        } catch (error) {
            setError("Credenciales incorrectas o error en el servidor");
        }
    };

    return (
        <div className="container-fluid d-flex flex-column justify-content-center align-items-center min-vh-100">

          
            {/* Card con formulario */}
            <div className="col-12 col-sm-10 col-md-6 col-lg-4">
                <div className="card shadow border-0">
                    <div className="card-body p-4">
                        <h3 className="text-center mb-4">Iniciar sesión</h3>
                        <form onSubmit={handleLogin} className="d-flex flex-column gap-3">
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}
                            <div className="form-floating">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Correo Electrónico"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <label htmlFor="email">Correo Electrónico</label>
                            </div>
                            <div className="form-floating">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <label htmlFor="password">Contraseña</label>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">
                                Iniciar sesión
                            </button>
                        </form>
                        <div className="text-center mt-4">
                            <a href="/register" className="text-decoration-none text-muted">
                                ¿No tienes cuenta? Contacta con nosotros
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
