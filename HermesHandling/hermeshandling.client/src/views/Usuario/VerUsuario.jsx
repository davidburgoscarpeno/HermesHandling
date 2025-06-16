import React, { useState } from "react";
import axios from "axios";
import "../../assets/css/Usuario/VerUsuario.css";

function VerUsuario() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [password, setPassword] = useState("");
  const [editando, setEditando] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [cargando, setCargando] = useState(false);

  const getTipoUsuarioNombre = (tipo) => {
    switch (tipo) {
      case 0:
        return "Administrador App";
      case 1:
        return "Administrador Compañía";
      case 2:
        return "Usuario";
      default:
        return "Desconocido";
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!password.trim()) {
      setError("La password no puede estar vacía.");
      return;
    }
    setCargando(true);
    try {
      const payload = { id: usuario.idUsuario };
      if (password.trim()) {
        payload.password = password;
      }

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/edit-password`,
        payload
      );
      setSuccess("Perfil actualizado correctamente.");
      setEditando(false);
      setPassword("");
      setTimeout(() => setSuccess(""), 2000);
    } catch (err) {
        setError("No se pudo actualizar el perfil");
    } finally {
      setCargando(false);
    }
  };

  React.useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  if (!usuario)
    return (
      <div className="editar-usuario-alert-message editar-usuario-alert-error fade-in">
        No hay datos de usuario.
      </div>
    );

  return (
    <div className="editar-usuario-container">
      <div className="form-container">
        <h3>Mi Perfil</h3>

        {error && (
          <div className="editar-usuario-alert-message editar-usuario-alert-error fade-in">
            {error}
          </div>
        )}
        {success && (
          <div className="editar-usuario-alert-message editar-usuario-alert-success fade-in">
            {success}
          </div>
        )}

        <form className="form" onSubmit={handleGuardar}>
          <div className="form-group">
            <label>Nombre</label>
            <input type="text" value={usuario.nombreUsuario} disabled />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={usuario.email} disabled />
          </div>
          <div className="form-group">
            <label>Tipo de Usuario</label>
            <input
              type="text"
              value={getTipoUsuarioNombre(usuario.tipoUsuario)}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Contrase&ntilde;a</label>
            {editando ? (
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <div className="input-password-wrapper">
                  <input
                    type={mostrarPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Nueva contraseña"
                    disabled={cargando}
                    autoFocus
                  />
                  <button
                    type="button"
                    className="input-password-eye"
                    tabIndex={-1}
                    onClick={() => setMostrarPassword((v) => !v)}
                    aria-label={mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {mostrarPassword ? (
                      // Ojo abierto SVG
                      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                        <path stroke="#232946" strokeWidth="2" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"/>
                        <circle cx="12" cy="12" r="3" stroke="#232946" strokeWidth="2"/>
                      </svg>
                    ) : (
                      // Ojo cerrado SVG
                      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                        <path stroke="#232946" strokeWidth="2" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"/>
                        <circle cx="12" cy="12" r="3" stroke="#232946" strokeWidth="2"/>
                        <line x1="4" y1="20" x2="20" y2="4" stroke="#e63946" strokeWidth="2"/>
                      </svg>
                    )}
                  </button>
                </div>
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={cargando || !password.trim()}
                >
                  {cargando ? "Guardando..." : "Guardar"}
                </button>
                <button
                  type="button"
                  className="btn-cancelar"
                  onClick={() => {
                    setEditando(false);
                    setPassword("");
                    setError("");
                  }}
                  disabled={cargando}
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <input type="password" value="********" disabled />
                <button
                  type="button"
                  className="btn-submit"
                  onClick={() => setEditando(true)}
                >
                  Cambiar Contrase&ntilde;a
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default VerUsuario;