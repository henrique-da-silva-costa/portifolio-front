import React from 'react'
import { Button, Container } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import Formularios from '../Formularios';
import styles from "../Stylos.module.css"

const Login = () => {
    const nav = useNavigate();
    const tiposDeInput = ["email", "password"];

    const inputs = {
        email: "",
        senha: ""
    }

    return (
        <>
            <Button color="primary" className="m-2" onClick={() => nav("/barbeiro")}>SOU BARBEIRO</Button>
            <Container className={styles.formularioContainer}>
                <h1 className="text-center">LOGIN</h1>
                <Formularios
                    inputs={inputs}
                    botaoformulario={"LOGAR"}
                    tiposInput={tiposDeInput}
                    url={"login"}
                    formularioLogin={true}
                    tipoLogin={"login"}
                    loginBotoes={true}
                />
            </Container >
        </>
    )
}

export default Login