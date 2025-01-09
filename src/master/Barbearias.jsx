import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Container, Table } from 'reactstrap';
import CadastrarBarbearia from './CadastrarBarbearia';
import ModalExcluir from '../ModalExcluir';
import ModalEditar from '../ModalEditar';
import Carregando from '../Carregando';
import styles from "../Stylos.module.css";

const Barbearias = () => {
    const [dados, setDados] = useState([]);
    const [msg, setMsg] = useState("");
    const [removerLoading, setRemoverLoading] = useState(false);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [botaoDesabilitado, setBotaoDesabilitado] = useState(false);
    const nav = useNavigate();

    const inputs = {
        nome: "",
        telefone: "",
        cep: "",
        estado: "",
        localidade: "",
        bairro: "",
        logradouro: "",
        numero: "",
        id: "",
        usuarios_id: sessionStorage.getItem("usuarioId"),
    }

    const pegarDados = (page) => {
        setBotaoDesabilitado(true)
        axios.get("http://127.0.0.1:8000/barbeariasunicas", {
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

    const barbeariaInformacao = (id, nome) => {
        localStorage.setItem("barbeariaid", id);
        localStorage.setItem("barbeariaNome", nome);
        nav("/barbearia");
    }

    const barbeariaReserva = (id, nome) => {
        localStorage.setItem("barbeariaid", id);
        localStorage.setItem("barbeariaNome", nome);
        nav("/barbearia/reserva");
    }

    return (
        <Container className="mt-3">
            <h1 className="mt-3">BARBEARIAS</h1>
            <CadastrarBarbearia pegarDados={pegarDados} className="text-end" />
            <div className="row">
                {dados.length > 0 ?
                    <Table responsive striped>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Telefone</th>
                                <th>Cidade/Estado</th>
                                <th>Bairro/Rua</th>
                                <th>Numero</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <>
                                {dados.length > 0 ? dados.map((dado, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>
                                                <p>{dado.nome}</p>
                                            </td>
                                            <td>
                                                <p>{dado.telefone}</p>
                                            </td>
                                            <td>
                                                <p>{dado.localidade} / {dado.estado}</p>
                                            </td>
                                            <td>
                                                <p>{dado.bairro} / {dado.logradouro.length > 20 ? dado.logradouro.slice(0, 20) + "..." : dado.logradouro}</p>
                                            </td>
                                            <td>
                                                <p>{dado.numero}</p>
                                            </td>
                                            <td className="align-items-center d-flex gap-2 justify-content-end">
                                                <Button
                                                    size="sm"
                                                    onClick={() => barbeariaReserva(dado.id, dado.nome)}
                                                    color="primary"
                                                >RESERVAS</Button>
                                                <Button
                                                    color="primary" size="sm" onClick={() => barbeariaInformacao(dado.id, dado.nome)}
                                                >VAR MAIS
                                                </Button>
                                                <ModalEditar
                                                    colunas={"col-md-6"}
                                                    nomeFormulario={"editarBarbearia"}
                                                    titulo="EDITAR BARBEARIA"
                                                    inputs={inputs}
                                                    botaoformulario={"EDITAR"}
                                                    id={dado.id}
                                                    url={"barbearia"}
                                                    pegarDados={pegarDados}
                                                    urlEditar={"barbearia/editar"}
                                                    colunasDeCep={true}
                                                    modalTelaCheia={true}
                                                />
                                                <ModalExcluir
                                                    url={"barbearia/excluir"}
                                                    id={dado.id}
                                                    titulo={`Excluir barbearia ${dado.nome}`}
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
                {!removerLoading ? <Carregando /> : dados.length > 0 ? "" : <h2 className="text-center">SEM INFORMAÇÕES</h2>}
            </div>

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
        </Container >
    )
}

export default Barbearias
