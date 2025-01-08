import React, { useState } from 'react'
import Horario from './Horario';
import Servico from './Servico';
import BotaoVoltar from "../BotaoVoltar"
import { Container, Nav, NavLink } from 'reactstrap';

const Barbearia = () => {
    const [valor, setValor] = useState(
        <Horario barbearia_id={localStorage.getItem("barbeariaid")} />
    );
    const [ativoHorario, setAtivoHorario] = useState(true)
    const [ativoServico, setAtivoServico] = useState(false)

    const horario = (e) => {
        e.preventDefault();

        setValor(<Horario barbearia_id={localStorage.getItem("barbeariaid")} />);
        setAtivoHorario(true)
        setAtivoServico(false)
    }

    const servico = (e) => {
        e.preventDefault();

        setValor(<Servico barbearia_id={localStorage.getItem("barbeariaid")} />);
        setAtivoServico(true)
        setAtivoHorario(false)
    }

    return (
        <>
            <BotaoVoltar url={"/"} />
            <Container>
                <h1>{localStorage.getItem("barbeariaNome").length > 80 ? localStorage.getItem("barbeariaNome").slice(0, 80) + "..." : localStorage.getItem("barbeariaNome")}</h1>
                <Nav
                    pills
                >
                    <NavLink
                        type="button"
                        active={ativoHorario}
                        onClick={horario}
                    >
                        HORARIO
                    </NavLink>
                    <NavLink
                        type="button"
                        active={ativoServico}
                        onClick={servico}
                    >
                        SERVIÇO
                    </NavLink>
                </Nav>
                {valor}
            </Container>
        </>
    )
}

export default Barbearia
