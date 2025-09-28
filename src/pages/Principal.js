import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { useHistory } from "react-router-dom";
import "../index.css";

export default function Principal() {
    const [dados, setDados] = useState(null);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) {
            history.push("/login");
            return;
        }

        db.collection("users")
            .doc(user.uid)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    setDados(doc.data());
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [history]);

    const handleLogout = () => {
        auth.signOut().then(() => {
            history.push("/login");
        });
    };

    if (loading)
        return <p style={{ color: "#fff", textAlign: "center" }}>Carregando...</p>;

    if (!dados)
        return (
            <div className="container">
                <p>Dados do usuário não encontrados.</p>
                <button onClick={() => history.push("/login")}>Voltar</button>
            </div>
        );

    return (
        <div className="principal-container">
            <h1 className="">Página Principal</h1>
            <br></br>
            <h1>Seja Bem Vindo <span>{dados.nome}</span></h1>
            <h2>Dados do Usuário</h2>
            <div className="user-info">
                <div className="info-row">
                    <span className="info-label">Nome:</span>
                    <span className="info-value">{dados.nome}</span>
                </div>
                <div className="info-row">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{dados.email}</span>
                </div>
                <div className="info-row">
                    <span className="info-label">Sobrenome:</span>
                    <span className="info-value">{dados.sobrenome}</span>
                </div>
                <div className="info-row">
                    <span className="info-label">Data de Nascimento:</span>
                    <span className="info-value">{dados.dataNascimento}</span>
                </div>
            </div>


            <button className="logout-button" onClick={handleLogout}>
                Sair
            </button>
        </div>
    );
}
