import { useState } from "react";
import { auth, db } from "../firebase";
import { useHistory } from "react-router-dom";
import "../index.css";

export default function Register() {
    const [form, setForm] = useState({
        email: "",
        password: "",
        nome: "",
        sobrenome: "",
        dataNascimento: "",
    });
    const [error, setError] = useState("");
    const history = useHistory();

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (
            !form.email ||
            !form.password ||
            !form.nome ||
            !form.sobrenome ||
            !form.dataNascimento
        ) {
            setError("Preencha todos os campos.");
            return;
        }

        auth
            .createUserWithEmailAndPassword(form.email, form.password)
            .then((userCredential) => {
                const uid = userCredential.user.uid;
                return db.collection("users").doc(uid).set({
                    uid,
                    email: form.email,
                    nome: form.nome,
                    sobrenome: form.sobrenome,
                    dataNascimento: form.dataNascimento,
                });
            })
            .then(() => history.push("/principal"))
            .catch((err) => setError(err.message));
    };

    return (
        <div className="container">
            <h2>Cadastro</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="E-mail" onChange={handleChange} />
                <input type="password" name="password" placeholder="Senha" onChange={handleChange} />
                <input type="text" name="nome" placeholder="Nome" onChange={handleChange} />
                <input type="text" name="sobrenome" placeholder="Sobrenome" onChange={handleChange} />
                <span>Data de Nascimento:</span>
                <input type="date" name="dataNascimento" onChange={handleChange} />
                <button type="submit">Cadastrar</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <p>
                Já tem conta? <a href="/login">Entrar</a>
            </p>
        </div>
    );
}
