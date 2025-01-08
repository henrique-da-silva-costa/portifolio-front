import React, { useState } from 'react'
import Formularios from "../Formularios";
import { Container, Modal, ModalBody } from 'reactstrap';

const Cartao = () => {
    const [modal, setModal] = useState(false);
    const [msg] = useState("");

    const toggle = () => setModal(!modal);

    const inputs = {
        holder: "",
        number: "",
        expYear: "",
        expMonth: "",
        securityCode: "",
        encript: "",
    }

    return (
        <>
            <Container >
                <h2 className="text-center">CARTÃO</h2>
                <Formularios
                    colunas={"col-md-6"}
                    nomeFormulario={"cartao"}
                    botaoformulario={"PAGAR"}
                    url={"pagamentocartao"}
                    pagamentoCartao={true}
                    inputs={inputs}
                    placeholderNomeTipo={"cartao"}
                    msgerro={msg}
                    modalCartao={setModal}
                />
                <Modal
                    isOpen={modal}
                    size="lg"
                    toggle={toggle}
                >
                    <ModalBody>
                        <h2 className="text-success">Horário reservado com sucesso!</h2>
                    </ModalBody>
                </Modal>
            </Container >
        </>
    )
}

export default Cartao