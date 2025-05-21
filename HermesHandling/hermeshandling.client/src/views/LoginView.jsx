import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/images/hermes-og.png";
import logoDark from "../assets/images/hermes.png";
import "../assets/css/login/login.css";

const LoginView = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(
        document.body.classList.contains("dark-mode")
    );
    const navigate = useNavigate();

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDarkMode(document.body.classList.contains("dark-mode"));
        });
        observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
        return () => observer.disconnect();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const user = {
            email: email.trim(),
            password: password.trim()
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/Account/login`, user);

            const data = response.data;

            if (!data.token || !data.usuario) {
                setError("Respuesta no válida del servidor");
                setLoading(false);
                return;
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('usuario', JSON.stringify(data.usuario));

            if (data.usuario.tipoUsuario === 0) {
                navigate("/admin-app/dashboard");
            } else {
                navigate("/usuario");
            }
        } catch (error) {
            setError(error.response?.data?.message || "Credenciales incorrectas o error en el servidor");
            setLoading(false);
        }
    };

    return (
        <div className="login-root">
            <div className="login-bg">
                <img src={isDarkMode ? logoDark : logo} alt="Logo" className="login-bg-logo" />
            </div>
            <div className="login-container">
                <div className="login-card">
                    <form className="login-form" onSubmit={handleLogin}>
                        {error && (
                            <div className="login-error" role="alert">
                                {error}
                            </div>
                        )}
                        <div>
                            <label className="login-label" htmlFor="email">Correo Electr&oacute;nico</label>
                            <input
                                className="login-input"
                                type="email"
                                id="email"
                                placeholder=""
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label className="login-label" htmlFor="password">Contrase&ntilde;a</label>
                            <input
                                className="login-input"
                                type="password"
                                id="password"
                                placeholder=""
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>
                        <button type="submit" className="login-btn" disabled={loading}>
                            {loading ? (
                                <>
                                    <span className="login-spinner" aria-label="Cargando"></span>
                                    Cargando...
                                </>
                            ) : (
                                "Iniciar sesion"
                            )}
                        </button>
                    </form>
                    <div className="login-link">
                        &iquest;No tienes cuenta? <a href="/register">Reg&iacute;strate</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginView;
