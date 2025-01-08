import React from 'react'
import Formularios from '../Formularios';
import { Container } from 'reactstrap';
import BotaoVoltar from '../BotaoVoltar';
import styles from "../Stylos.module.css"

const RecuperarSenhaEmail = () => {
    const input = { email: "" }

    return (
        <>
            <BotaoVoltar url={"/"} />
            <Container className={styles.formularioContainer}>
                <h1 className="text-center">VERIFICAR E-MAIL</h1>
                <Formularios
                    inputs={input}
                    recuperarSenhaEmail={true}
                    linkNav={"/recuperarsenha/email"}
                    linkNavVazio={"/recuperarsenha"}
                    botaoformulario={"VERIFICAR"}
                    url={"recuperarsenha/email"}
                />
            </Container>
        </>
    )
}

export default RecuperarSenhaEmail