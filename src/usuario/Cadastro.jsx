import React from 'react'
import Formularios from '../Formularios';
import { Container } from 'reactstrap';
import BotaoVoltar from '../BotaoVoltar';
import styles from "../Stylos.module.css"

const Cadastro = () => {
    const inputs = {
        img: null,
        nome: "",
        senha: "",
        email: "",
        master: 0,
    }

    return (
        <>
            <BotaoVoltar url={"/"} />
            <Container className={styles.formularioContainer}>
                <h1 className="text-center">CADASTRO DE USUARIO</h1>
                <Formularios
                    colunas={"col-md-6"}
                    nomeFormulario={"cadastroUsuario"}
                    inputs={inputs}
                    url={"cadastrar/usuario"}
                    linkNav={"/cadastro"}
                    linkNavVazio={"/"}
                    botaoformulario={"CADASTRAR"}
                />
            </Container>
        </>
    )
}

export default Cadastro