import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container, Table } from 'reactstrap';
import Carregando from '../Carregando';
import styles from "../Stylos.module.css";
import BotaoVoltar from '../BotaoVoltar';
import moment from 'moment';
import ModalEditar from '../modais/ModalEditar';
import ModalExcluir from '../modais/ModalExcluir';

const Reservas = () => {
    const [horarios, setHorarios] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [reservas, setReserva] = useState([]);
    const [barbearia_id] = useState(localStorage.getItem("barbeariaid"));
    const [barbearia_nome] = useState(localStorage.getItem("barbeariaNome"));
    const [msgErroGet, setMsgErroGet] = useState("");
    const [removerLoading, setRemoverLoading] = useState(false);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [botaoDesabilitado, setBotaoDesabilitado] = useState(false);

    const inputs = {
        id: "",
        data: "",
        hora: "",
        servico: "",
        barbearia_id: barbearia_id,
    }

    const pegarDados = (page) => {
        setBotaoDesabilitado(true)
        axios.get("http://127.0.0.1:8000/barbearia/reservas", {
            params: {
                "barbearia_id": barbearia_id,
                "page": page,

            }
        }).then((res) => {
            setReserva(res.data.data);
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
            axios.get("http://127.0.0.1:8000/barbearia/horarios/normal", { params: { "barbearia_id": barbearia_id } }).then((res) => {
                setHorarios(res.data);
                setRemoverLoading(true);
            }).catch((err) => {
                setMsgErroGet("erro interno servidor, entre em  contato com o suporte");
            })

            axios.get("http://127.0.0.1:8000/barbearia/servicos/normal", { params: { "barbearia_id": barbearia_id } }).then((res) => {
                setServicos(res.data);
                setRemoverLoading(true);
            }).catch((err) => {
                setMsgErroGet("erro interno servidor, entre em  contato com o suporte");
            })
        }, 500);
    }, [paginaAtual]);

    const paginar = (page) => {
        setBotaoDesabilitado(true);
        if (page >= 1 && page <= totalPages) {
            setPaginaAtual(page);
        }
    };

    return (
        <>
            <BotaoVoltar url={"/"} />
            <Container className="mt-2">
                <h1>RESERVAS</h1>
                <h4 className="mt-3">{barbearia_nome}</h4>
                {reservas.length > 0 ? <Table responsive striped>
                    <thead>
                        <tr>
                            <th>Usuário</th>
                            <th>Serviço</th>
                            <th>Data</th>
                            <th>Hora</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <>
                            {reservas.length > 0 ? reservas.map((reserva, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{reserva.usuario_nome}</td>
                                        <td>{reserva.servico_nome}</td>
                                        <td>{moment(reserva.data).format("DD/MM/YYYY")}</td>
                                        <td>{reserva.hora}</td>
                                        <td className="text-end d-flex gap-2 justify-content-end">
                                            <ModalEditar
                                                titulo={"EDITAR RESERVA"}
                                                inputs={inputs}
                                                botaoformulario={"EDITAR"}
                                                botaoAbrirNome={"EDITAR"}
                                                id={reserva.id}
                                                url={"reserva"}
                                                urlEditar={"reserva"}
                                                pegarDados={pegarDados}
                                                horarios={horarios}
                                                servicos={servicos}
                                                colunasDeReseva={true}
                                            />
                                            <ModalExcluir
                                                url={"reserva"}
                                                id={reserva.id}
                                                titulo={"EXCLUIR RESERVA"}
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
                {!removerLoading ? <Carregando /> : reservas.length > 0 ? "" : <h2 className="text-center">SEM INFORMAÇÕES</h2>}


                {reservas.length > 0 ? <>
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
            </Container>
        </>
    )
}

export default Reservas
