import React from 'react'
import Formularios from '../Formularios';
import { Container } from 'reactstrap';
import BotaoVoltar from '../BotaoVoltar';
import styles from "../Stylos.module.css"

const CadastroMaster = () => {
    const inputs = {
        img: null,
        nome: "",
        senha: "",
        email: "",
        master: 1,
    }

    return (
        <>
            <BotaoVoltar url={"/barbeiro"} />
            <Container className={styles.formularioContainer}>
                <h1 className="text-center">CADASTRO DE USUARIO (BARBEIRO)</h1>
                <Formularios
                    colunas={"col-md-6"}
                    nomeFormulario={"cadastroUsuario"}
                    inputs={inputs}
                    url={"cadastrar/usuario"}
                    linkNav={"/cadastrobarbeiro"}
                    linkNavVazio={"/barbeiro"}
                    botaoformulario={"CADASTRAR"}
                />
            </Container>
        </>
    )
}

export default CadastroMaster