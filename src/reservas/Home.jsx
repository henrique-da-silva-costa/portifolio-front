import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Table } from 'reactstrap';
import styles from "../Stylos.module.css";
import Carregando from '../Carregando';
import Formularios from '../Formularios';

const Home = () => {
    const [dados, setDados] = useState([]);
    const [msg, setMsg] = useState("");
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [botaoDesabilitado, setBotaoDesabilitado] = useState(false);
    const [removerLoading, setRemoverLoading] = useState(false);
    const nav = useNavigate();

    const inputs = {
        filtroCep: "",
        filtroEstado: "",
        filtroCidade: ""
    }

    const pegarDados = (page) => {
        setBotaoDesabilitado(true)
        axios.get("http://localhost:8000/barbearias", {
            params: {
                "id": sessionStorage.getItem("usuarioId"),
                "page": page
            }
        }).then((res) => {
            setDados(res.data.data);
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
            pegarDados(paginaAtual);
        }, 1000);
    }, [paginaAtual]);

    const paginar = (page) => {
        setBotaoDesabilitado(true);
        if (page >= 1 && page <= totalPages) {
            setPaginaAtual(page);
        }
    };

    return (
        <>
            <h1 className="p-2">Barbearias</h1>
            <Container className="p-sm-5">
                <Formularios
                    colunas={"col-md-4"}
                    nomeFormulario={"filtros"}
                    filtros={true}
                    botaoformulario={"FILTRAR"}
                    totalPages={setTotalPages}
                    paginaAtual={setPaginaAtual}
                    dados={setDados}
                    inputs={inputs}
                />
                <h2>Barbearias disponíveis</h2>

                {dados.length > 0 ?
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Telefone</th>
                                <th>Cidade/Estado</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <>
                                {dados.length > 0 ? dados.map((dado, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>
                                                <p><strong>{dado.nome}</strong></p>
                                            </td>
                                            <td>
                                                <p>{dado.telefone}</p>
                                            </td>
                                            <td><p>{dado.localidade && dado.estado ? dado.localidade + "/" + dado.estado : "Não informado"} </p>
                                            </td>
                                            <td className="text-end">
                                                <Button color="primary" onClick={() => { nav(`/barbearias/${dado.id}`) }}>AGENDAR HORÁRIO</Button>
                                            </td>
                                        </tr>
                                    )
                                }) : ""}
                            </>
                        </tbody>
                    </Table>
                    : ""}

                {msg ? <p className={styles.erro}>{msg}</p> : ""}
                {!removerLoading ? <Carregando /> : dados.length > 0 ? "" : <h2 className="text-center">SEM INFORMAÇÕES</h2>}


                {dados.length > 0 ?
                    <>
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
                    </>
                    : ""}
            </Container>
        </>
    )
}

export default Home
