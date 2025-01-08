import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container } from 'reactstrap';
import styles from "../Stylos.module.css"
import Carregando from '../Carregando';

const Pix = () => {
    const [dados, setDados] = useState([]);
    const [msg, setMsg] = useState("");
    const [removerLoading, setRemoverLoading] = useState("");

    useEffect(() => {
        setTimeout(() => {
            axios.get("http://localhost:8000/pagamentopix").then((res) => {
                setDados(res.data.qr_codes[0].links[0].href);
                setRemoverLoading(true);
            }).catch((err) => {
                setMsg("erro interno servidor, entre em  contato com o suporte");
            })
        }, 1000);
    }, []);

    return (
        <Container className={styles.pix}>
            {msg ? <p className={styles.erro}>{msg}</p> : ""}
            {!removerLoading ? <Carregando /> : dados.length > 0 ? <img src={dados} height={300} alt="PIX" /> : <h2>PIX EXPIRADO</h2>}
        </Container>
    )
}

export default Pix
