import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Carregando from '../Carregando';
import styles from "../Stylos.module.css"

const ServicoReserva = ({ barbearia_id }) => {
    const [servicos, setServicos] = useState([]);
    const [msg, setMsg] = useState("");
    const [removerLoading, setRemoverLoading] = useState("");

    useEffect(() => {
        setTimeout(() => {
            axios.get("http://127.0.0.1:8000/barbearia/servicos/normal", { params: { "barbearia_id": barbearia_id } }).then((res) => {
                setServicos(res.data);
                setRemoverLoading(true);
            }).catch((err) => {
                setMsg("erro interno servidor, entre em  contato com o suporte");
            })
        }, 1000);
    }, []);

    return (
        <>
            {servicos.length > 0 ? servicos.map((servico, i) => {
                return (
                    <div key={i}>
                        <h4>{servico.nome}</h4>
                        <p>{servico.valor}</p>
                    </div>
                )
            }) : ""}
            {msg ? <p className={styles.erro}>{msg}</p> : ""}
            {!removerLoading ? <Carregando /> : servicos.length > 0 ? "" : <h2 className="text-center">SEM INFORMAÇÕES</h2>}
        </>
    )
}

export default ServicoReserva
