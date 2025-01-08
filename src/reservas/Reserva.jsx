import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ModalCadastrar from '../ModalCadastrar';

const Reserva = ({ barbearia_id }) => {
    const [horarios, setHorarios] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [msg, setMsg] = useState("");

    const inputs = {
        nome_reserva: JSON.parse(sessionStorage.getItem("usuarioNome") ? sessionStorage.getItem("usuarioNome") : ""),
        data: "",
        hora: "",
        servico: "",
        barbearia_id: barbearia_id,
        usuarios_id: JSON.parse(sessionStorage.getItem("usuarioId") ? sessionStorage.getItem("usuarioId") : ""),
    }


    useEffect(() => {
        axios.get("http://127.0.0.1:8000/barbearia/horarios/normal", { params: { "barbearia_id": barbearia_id } }).then((res) => {
            setHorarios(res.data);
        }).catch((err) => {
            setMsg("erro interno servidor, entre em  contato com o suporte");
        })

        axios.get("http://127.0.0.1:8000/barbearia/servicos/normal", { params: { "barbearia_id": barbearia_id } }).then((res) => {
            setServicos(res.data);
        }).catch((err) => {
            setMsg("erro interno servidor, entre em  contato com o suporte");
        })
    }, []);

    return (
        <>
            <ModalCadastrar
                inputs={inputs}
                botaoformulario={"ENVIAR"}
                horarios={horarios}
                servicos={servicos}
                msgerro={msg}
                titulo={"AGENDAR HORÁRIO"}
                botaoAbrirNome={"AGENDAR HORÁRIO"}
                valorModal={false}
                reserva={true}
                url={"reserva/verificar"}
            />
        </>
    )
}

export default Reserva