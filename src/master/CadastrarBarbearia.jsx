import React from 'react'
import { Container } from 'reactstrap';
import ModalCadastrar from '../modais/ModalCadastrar';

const CadastrarBarbearia = ({ pegarDados = () => { } }) => {
    const inputs = {
        nome: "",
        telefone: "",
        cep: "",
        estado: "",
        localidade: "",
        bairro: "",
        logradouro: "",
        numero: "",
        usuarios_id: sessionStorage.getItem("usuarioId"),
    }

    return (
        <Container className="text-end">
            <ModalCadastrar
                modalTelaCheia={true}
                colunas={"col-md-6"}
                nomeFormulario={"cadastroBarbearia"}
                pegarDados={pegarDados}
                botaoAbrirNome={"CADASTRAR BARBEARIA"}
                titulo={"CADASTRAR BARBEARIA"}
                placeholderNomeTipo={"nomebarbearia"}
                inputs={inputs}
                botaoformulario={"CADASTRAR"}
                valorModal={false}
                url={"barbearia/cadastrar"}
            />
        </Container>
    )
}

export default CadastrarBarbearia
