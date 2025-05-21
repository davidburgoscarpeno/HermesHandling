import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/css/login/registerView.css";

function RegisterView() {
    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        tipoUsuario: "2" // Por defecto usuario
    });
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje("");
        setError("");
        setLoading(true);
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/Account/register`, {
                nombre: form.nombre,
                apellido: form.apellido,
                email: form.email,
                password: form.password,
                tipoUsuario: parseInt(form.tipoUsuario)
            });
            setMensaje("Usuario registrado correctamente. Ahora puedes iniciar sesion.");
            setForm({
                nombre: "",
                apellido: "",
                email: "",
                password: "",
                tipoUsuario: "2"
            });
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Error al registrar usuario.");
        }
        setLoading(false);
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <form className="register-form" onSubmit={handleSubmit}>
                    {mensaje && <div className="register-success">{mensaje}</div>}
                    {error && <div className="register-error">{error}</div>}
                    <h3 className="register-title">Registro de Usuario</h3>
                    <div>
                        <label className="register-label" htmlFor="nombre">Nombre</label>
                        <input
                            className="register-input"
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="register-label" htmlFor="apellido">Apellido</label>
                        <input
                            className="register-input"
                            type="text"
                            id="apellido"
                            name="apellido"
                            value={form.apellido}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="register-label" htmlFor="email">Email</label>
                        <input
                            className="register-input"
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="register-label" htmlFor="password">Contrase&ntilde;a</label>
                        <input
                            className="register-input"
                            type="password"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button className="register-btn" type="submit" disabled={loading}>
                        {loading ? "Registrando..." : "Registrar"}
                    </button>
                </form>
                <div className="register-link">
                    &iquest;Ya tienes cuenta? <a href="/login">Inicia sesi&oacute;n</a>
                </div>
            </div>
        </div>
    );
}

export default RegisterView;
