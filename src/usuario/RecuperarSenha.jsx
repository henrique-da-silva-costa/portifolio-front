import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Formularios from '../Formularios';
import { Container } from 'reactstrap';
import BotaoVoltar from '../BotaoVoltar';
import styles from "../Stylos.module.css"

const RecuperarSenha = () => {
    const nav = useNavigate();

    const inputs = {
        novasenha: "",
        confirmasenha: "",
        emailcomfirmar: localStorage.getItem("email") ? JSON.parse(localStorage.getItem("email")) : ""
    }

    useEffect(() => {
        if (!localStorage.getItem("email")) {
            nav("/recuperarsenha/email");
        }

        axios.post(`http://127.0.0.1:8000/recuperarsenha/email`, { "email": JSON.parse(localStorage.getItem("email")) }, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((res) => {
            if (res.data.erro) {
                nav("/recuperarsenha/email");
            }
        }).catch((err) => {
            nav("/recuperarsenha/email");
        })
    }, []);

    return (
        <>
            <BotaoVoltar />
            <Container Container className={styles.formularioContainer}>
                <h1 className="text-center">RECUPERAR SENHA</h1>
                <Formularios
                    inputs={inputs}
                    linkNav={"/recuperarsenha"}
                    linkNavVazio={"/"}
                    url={"recuperarsenha"}
                    recuperarSenha={true}
                    botaoformulario={"ALTERAR SENHA"}
                />
            </Container>
        </>
    )
}

export default RecuperarSenha