import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginView = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        const user = {
            email: email.trim(),
            password: password.trim()
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/account/login`, user);

            console.log("Respuesta del backend:", response.data);

            // Validamos que la respuesta tenga lo que necesitamos
            const data = response.data;

            if (typeof data !== 'object' || data === null) {
                setError("Respuesta no válida del servidor");
                return;
            }

            const { idUsuario, nombreUsuario, email, tipoUsuario } = data;

            // Guardar en localStorage
            localStorage.setItem("usuario", JSON.stringify({
                idUsuario,
                nombreUsuario,
                email,
                tipoUsuario
            }));

            // Redirección según tipo de usuario
            if (tipoUsuario === 0) {
                window.location.href = "/admin-app/dashboard";
            } else if (tipoUsuario === 1) {
                window.location.href = "/admin-company";
            } else {
                window.location.href = "/usuario";
            }

        } catch (error) {
            console.error("Error en login:", error.response?.data || error.message);
            setError(error.response?.data?.message || "Credenciales incorrectas o error en el servidor");
        }
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow border-0" style={{ maxWidth: '400px', width: '100%' }}>
                <div className="card-body p-4">
                    <h3 className="text-center mb-4">Iniciar sesi&oacute;n</h3>
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
                            <label htmlFor="email">Correo Electr&oacute;nico</label>
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
                            <label htmlFor="password">Contrase&ntilde;a</label>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Iniciar sesi&oacute;n
                        </button>

                    </form>
                    <div className="text-center mt-4">
                        <a href="/register" className="text-decoration-none text-muted">
                            &iquest;No tienes cuenta? Contacta con nosotros
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginView;
