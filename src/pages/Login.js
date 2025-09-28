import { useState } from "react";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";
import "../index.css";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const history = useHistory();

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        auth
            .signInWithEmailAndPassword(form.email, form.password)
            .then(() => {
                history.push("/principal");
            })
            .catch(() => {
                setError("Usuário não cadastrado ou senha incorreta.");
            });
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={form.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Senha"
                    value={form.password}
                    onChange={handleChange}
                />
                <button type="submit">Entrar</button>
            </form>

            {error && <p className="error-message">{error}</p>}

            <p>
                Não tem conta? <a href="/cadastro">Cadastre-se</a>
            </p>
        </div>
    );
}
