import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import HorarioReserva from './HorarioReserva';
import ServicoReserva from './ServicoReserva';
import Reserva from './Reserva';
import BotaoVoltar from '../BotaoVoltar';
import styles from "../Stylos.module.css"
import { Container, Nav, NavLink } from 'reactstrap';

const Barbearia = () => {
    const [barbeariaNome, setBarbeariaNome] = useState("");
    const [msg, setMsg] = useState("");
    const [ativoHorario, setAtivoHorario] = useState(true)
    const [ativoServico, setAtivoServico] = useState(false)
    const { id } = useParams();
    const [dado, setDado] = useState(<HorarioReserva barbearia_id={id} />);

    useEffect(() => {
        axios.get("http://localhost:8000/barbearia", { params: { id } }).then((res) => {
            setBarbeariaNome(res.data);
        }).catch((err) => {
            setMsg("erro interno servidor, entre em  contato com o suporte");
        })
    }, []);

    const horario = (e) => {
        e.preventDefault();

        setDado(<HorarioReserva barbearia_id={id} />);
        setAtivoHorario(true)
        setAtivoServico(false)
    }

    const servico = (e) => {
        e.preventDefault();

        setDado(<ServicoReserva barbearia_id={id} />);
        setAtivoServico(true)
        setAtivoHorario(false)
    }

    return (
        <>
            <BotaoVoltar url={"/"} />
            <Container>
                <h1>{barbeariaNome ? barbeariaNome.nome : ""}</h1>

                <div className="d-flex justify-content-end">
                    <Reserva barbearia_id={id} />
                </div>


                <Nav
                    pills
                >
                    <NavLink
                        type="button"
                        active={ativoHorario}
                        onClick={horario}
                    >
                        HORÁRIO
                    </NavLink>
                    <NavLink
                        type="button"
                        active={ativoServico}
                        onClick={servico}
                    >
                        SERVIÇO
                    </NavLink>
                </Nav>

                <div>
                    {msg ? <p className={styles.erro}>{msg}</p> : ""}
                    {dado}
                </div>


            </Container>
        </>
    )
}

export default Barbearia
