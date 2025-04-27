import React, { useState } from "react";
import axios from "axios";
import '../assets/css/login/login.css'; // Importa los estilos que te doy abajo

function Login() {
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
            const data = response.data;

            if (typeof data !== 'object' || data === null) {
                setError("Respuesta no válida del servidor");
                return;
            }

            const { idUsuario, nombreUsuario, email, tipoUsuario } = data;

            localStorage.setItem("usuario", JSON.stringify({
                idUsuario,
                nombreUsuario,
                email,
                tipoUsuario
            }));

            if (tipoUsuario === 0) {
                window.location.href = "/admin-app";
            } else if (tipoUsuario === 1) {
                window.location.href = "/admin-company";
            } else {
                window.location.href = "/usuario";
            }

        } catch (error) {
            setError(error.response?.data?.message || "Credenciales incorrectas o error en el servidor");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h3>Iniciar sesión</h3>
                <form onSubmit={handleLogin} className="login-form">
                    {error && <div className="login-error">{error}</div>}
                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Iniciar sesión</button>
                </form>
                <div className="login-footer">
                    <a href="/register">¿No tienes cuenta? Contacta con nosotros</a>
                </div>
            </div>
        </div>
    );
}

export default Login;
