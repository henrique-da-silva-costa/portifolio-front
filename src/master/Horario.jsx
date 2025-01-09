import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ModalExcluir from "../ModalExcluir"
import { Button, Container, Table } from 'reactstrap';
import Carregando from '../Carregando';
import ModalEditar from '../ModalEditar';
import ModalCadastrar from '../ModalCadastrar';
import styles from "../Stylos.module.css";

const Horario = ({ barbearia_id }) => {
    const [horarios, setHorarios] = useState([]);
    const [msg] = useState("");
    const [msgErroGet, setMsgErroGet] = useState("");
    const [valor] = useState(false);
    const [removerLoading, setRemoverLoading] = useState(false);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [botaoDesabilitado, setBotaoDesabilitado] = useState(false);

    const inputs = {
        horario: "",
        barbearia_id,
    }

    const pegarDados = (page) => {
        setBotaoDesabilitado(true)
        axios.get("http://127.0.0.1:8000/barbearia/horarios", {
            params: {
                "barbearia_id": barbearia_id,
                "page": page,

            }
        }).then((res) => {
            setHorarios(res.data.data);
            setPaginaAtual(res.data.current_page);
            setTotalPages(res.data.last_page);
            setBotaoDesabilitado(false);
            setRemoverLoading(true);
        }).catch((err) => {
            setMsgErroGet("erro interno servidor, entre em  contato com o suporte");
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
                    pegarDados={pegarDados}
                    titulo={"CADASTRAR HORÁRIO"}
                    botaoAbrirNome={"CADASTRAR HORÁRIO"}
                    botaoformulario={"CADASTRAR"}
                    inputs={inputs}
                    msgerro={msg}
                    valorModal={valor}
                    url={"barbearia/cadastrar/horario"} />
            </div>
            {horarios.length > 0 ? <Table responsive striped>
                <thead>
                    <tr>
                        <th>Horário</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <>
                        {horarios.length > 0 ? horarios.map((horario, i) => {
                            return (
                                <tr key={i}>
                                    <td>{horario.horario}</td>
                                    <td className="d-flex gap-2 justify-content-end">
                                        <ModalEditar
                                            titulo={"EDITAR HORÁRIO"}
                                            inputs={inputs}
                                            botaoformulario={"EDITAR"}
                                            botaoAbrirNome={"EDITAR HORÁRIO"}
                                            id={horario.id}
                                            url={"horario"}
                                            urlEditar={"barbearia/horarios/editar"}
                                            pegarDados={pegarDados}
                                            colunasDeHorario={true}
                                        />
                                        <ModalExcluir url={"barbearia/horarios/excluir"}
                                            id={horario.id}
                                            titulo={`Excluir horário: ${horario.horario}`}
                                            pegarDados={pegarDados}
                                        />
                                    </td>
                                </tr>
                            )
                        }) : ""}
                    </>
                </tbody>
            </Table> : ""}

            {msgErroGet ? <p className={styles.erro}>{msgErroGet}</p> : ""}
            {!removerLoading ? <Carregando /> : horarios.length > 0 ? "" : <h2 className="text-center">SEM INFORMAÇÕES</h2>}

            {horarios.length > 0 ?
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
    )
}
export default Horario
