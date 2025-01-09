import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Carregando from '../Carregando';
import styles from "../Stylos.module.css"
import { Button, Container, Table } from 'reactstrap';

const ServicoReserva = ({ barbearia_id }) => {
    const [servicos, setServicos] = useState([]);
    const [msg, setMsg] = useState("");
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [botaoDesabilitado, setBotaoDesabilitado] = useState(false);
    const [removerLoading, setRemoverLoading] = useState(false);


    const pegarDados = (page) => {
        setBotaoDesabilitado(true)
        axios.get("http://127.0.0.1:8000/barbearia/servicos", {
            params: {
                "page": page,
                "barbearia_id": barbearia_id

            }
        }).then((res) => {
            setServicos(res.data.data);
            setPaginaAtual(res.data.current_page);
            setTotalPages(res.data.last_page);
            setBotaoDesabilitado(false);
            setRemoverLoading(true);
        }).catch((err) => {
            setMsg("erro interno servidor, entre em  contato com o suporte");
            setBotaoDesabilitado(false);
        });
    }

    useEffect(() => {
        setTimeout(() => {
            pegarDados(paginaAtual)
        }, 1000);
    }, [paginaAtual]);

    const paginar = (page) => {
        setBotaoDesabilitado(true);
        if (page >= 1 && page <= totalPages) {
            setPaginaAtual(page);
        }
    };

    return (
        <Container>
            {servicos.length > 0 ?
                <Table responsive striped>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <>
                            {servicos.length > 0 ? servicos.map((servico, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{servico.nome}</td>
                                        <td>{servico.valor}</td>
                                    </tr>
                                )
                            }) : ""}
                        </>
                    </tbody>
                </Table>
                : ""}
            {msg ? <p className={styles.erro}>{msg}</p> : ""}
            {!removerLoading ? <Carregando /> : servicos.length > 0 ? "" : <h2 className="text-center">SEM INFORMAÇÕES</h2>}

            {servicos.length > 0 ? <>
                <div className="d-flex gap-2 justify-content-center">
                    <Button
                        color="primary"
                        onClick={() => paginar(paginaAtual - 1)}
                        disabled={paginaAtual === 1 ? paginaAtual : botaoDesabilitado}
                    >
                        Anterior
                    </Button>
                    {[...Array(totalPages)].map((_, index) => (
                        <Button
                            color="primary"
                            disabled={index == paginaAtual - 1 ? true : botaoDesabilitado}
                            key={index + 1}
                            onClick={() => paginar(index + 1)}
                            className={paginaAtual === index + 1 ? "active" : ""}
                        >
                            {index + 1}
                        </Button>
                    ))}
                    <Button
                        color="primary"
                        onClick={() => paginar(paginaAtual + 1)}
                        disabled={paginaAtual === totalPages ? paginaAtual : botaoDesabilitado}
                    >
                        Próximo
                    </Button>
                </div>
                {botaoDesabilitado ? <Carregando /> : ""}
            </> : ""}
        </Container >
    )
}

export default ServicoReserva
