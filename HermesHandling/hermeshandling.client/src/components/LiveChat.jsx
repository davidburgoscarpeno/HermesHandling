import { HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect, useState } from "react";

function getRolName(tipo) {
    switch (tipo) {
        case 0: return "Admin";
        case 1: return "Coordinador";
        case 2: return "Usuario";
        default: return "Desconocido";
    }
}

function LiveChat() {
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem("usuario");
        return stored ? JSON.parse(stored) : null;
    });

    useEffect(() => {
        if (!open) return;

        const conn = new HubConnectionBuilder()
            .withUrl("https://localhost:7019/chathub")
            .withAutomaticReconnect()
            .build();

        conn.on("ReceiveMessage", (userObj, message) => {
            setMessages(msgs => [...msgs, { user: userObj, message }]);
        });

        conn.start()
            .then(async () => {
                setConnection(conn);
                try {
                    const history = await conn.invoke("GetHistory");
                    setMessages(history.map(m => ({
                        user: m.user,
                        message: m.message,
                        timestamp: m.timestamp
                    })));
                } catch (err) {
                    console.error("Error al obtener historial:", err);
                }
            })
            .catch(err => console.error("Error al conectar con SignalR:", err));

        return () => { conn.stop(); };
    }, [open]);

    const sendMessage = async () => {
        if (connection && input.trim() && user) {
            try {
                await connection.invoke("SendMessage", {
                    nombreUsuario: user.nombreUsuario,
                    tipoUsuario: user.tipoUsuario
                }, input);
                setInput("");
            } catch (err) {
                console.error("Error al enviar mensaje:", err);
            }
        }
    };

    const handleOpen = () => {
        if (!user) {
            const nombreUsuario = prompt("Introduce tu nombre:");
            if (nombreUsuario && nombreUsuario.trim()) {
                const tipoUsuario = 2;
                const newUser = { nombreUsuario: nombreUsuario.trim(), tipoUsuario };
                setUser(newUser);
                localStorage.setItem("usuario", JSON.stringify(newUser));
                setOpen(true);
            }
        } else {
            setOpen(o => !o);
        }
    };

    return (
        <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000 }}>
            <button
                onClick={handleOpen}
                style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "#0078d4",
                    color: "#fff",
                    fontSize: 28,
                    border: "none",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    cursor: "pointer"
                }}
                aria-label="Abrir chat"
            >
                💬
            </button>
            {open && (
                <div
                    style={{
                        position: "absolute",
                        bottom: 70,
                        right: 0,
                        width: 500,
                        minHeight: 400,
                        maxHeight: 500,
                        background: "#fff",
                        border: "1px solid #ccc",
                        borderRadius: 8,
                        boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
                        display: "flex",
                        flexDirection: "column",
                        padding: 16
                    }}
                >
                    <div style={{ flex: 1, overflowY: "auto", marginBottom: 8 }}>
                        {messages.map((msg, idx) => {
                            const nombre = typeof msg.user === "object" && msg.user !== null
                                ? msg.user.nombreUsuario
                                : msg.user;
                            const tipoUsuario = typeof msg.user === "object" && msg.user !== null
                                ? msg.user.tipoUsuario
                                : undefined;
                            return (
                                <div key={idx}>
                                    <b>
                                        {nombre || "Desconocido"}
                                        {tipoUsuario !== undefined ? ` (${getRolName(tipoUsuario)})` : ""}
                                        :
                                    </b> {msg.message}
                                </div>
                            );
                        })}
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder="Escribe un mensaje..."
                            style={{ flex: 1, padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                            onKeyDown={e => { if (e.key === "Enter") sendMessage(); }}
                        />
                        <button
                            onClick={sendMessage}
                            style={{
                                padding: "8px 16px",
                                borderRadius: 4,
                                border: "none",
                                background: "#0078d4",
                                color: "#fff",
                                cursor: "pointer"
                            }}
                        >
                            Enviar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LiveChat;
