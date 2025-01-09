import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ModalExcluir from '../ModalExcluir';
import { Button, Container, Table } from 'reactstrap';
import ModalEditar from '../ModalEditar';
import Carregando from '../Carregando';
import ModalCadastrar from '../ModalCadastrar';
import styles from "../Stylos.module.css";

const Servico = ({ barbearia_id }) => {
    const [servicos, setServicos] = useState([]);
    const [msg, setMsg] = useState("");
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [botaoDesabilitado, setBotaoDesabilitado] = useState(false);
    const [removerLoading, setRemoverLoading] = useState(false)

    const inputs = {
        nome: "",
        valor: "",
        barbearia_id,
    }

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
        <Container className="mt-2">
            <div className="text-end">
                <ModalCadastrar
                    titulo={"CADASTRAR SERVIÇO"}
                    inputs={inputs}
                    botaoformulario={"CADASTRAR"}
                    placeholderNomeTipo={"nomeservico"}
                    botaoAbrirNome={"CADASTRAR SERVIÇO"}
                    url={"barbearia/cadastrar/servico"}
                    pegarDados={pegarDados}
                />
            </div>
            {servicos.length > 0 ? <Table responsive striped>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Valor</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <>
                        {servicos.length > 0 ? servicos.map((servico, i) => {
                            return (
                                <tr key={i}>
                                    <td>{servico.nome}</td>
                                    <td>{servico.valor}</td>
                                    <td className="d-flex gap-2 justify-content-end">
                                        <ModalEditar
                                            titulo={"EDITAR SERVIÇO"}
                                            inputs={inputs}
                                            botaoformulario={"EDITAR"}
                                            botaoAbrirNome={"EDITAR SERVIÇO"}
                                            id={servico.id}
                                            url={"servico"}
                                            urlEditar={"barbearia/servicos/editar"}
                                            placeholderNomeTipo={"nomeservico"}
                                            pegarDados={pegarDados}
                                        />
                                        <ModalExcluir url={"barbearia/servicos/excluir"}
                                            id={servico.id}
                                            titulo={`Excluir ${servico.nome}`}
                                            pegarDados={pegarDados}
                                        />
                                    </td>
                                </tr>
                            )
                        }) : ""}
                    </>
                </tbody>
            </Table> : ""}
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

export default Servico
