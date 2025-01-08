import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import Formularios from '../Formularios';
import styles from "../Stylos.module.css"

const Loginmaster = () => {
    const nav = useNavigate();

    const inputs = {
        email: "",
        senha: ""
    }

    return (
        <>
            <Button color="primary" className="m-2" onClick={() => nav("/")}>SOU CLIENTE</Button>
            <Container className={styles.formularioContainer}>
                <h1 className="text-center">LOGIN BARBEIRO</h1>
                <Formularios
                    inputs={inputs}
                    url={"loginmaster"}
                    botaoformulario={"LOGAR"}
                    formularioLogin={true}
                    tipoLogin={"loginmaster"}
                    loginBotoes={true}
                />
            </Container >
        </>
    )
}

export default Loginmaster