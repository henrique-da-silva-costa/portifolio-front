import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalGlobal = ({ botaoAbrirNome = "", titulo = "", conteudo }) => {
    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
    };

    return (
        <div>
            <Button color="success" onClick={toggle}>{botaoAbrirNome}</Button>
            <Modal isOpen={modal}>
                <ModalHeader toggle={toggle}>{titulo}</ModalHeader>
                <ModalBody>
                    {conteudo}
                </ModalBody>

                <ModalFooter>
                    <Button color="danger" onClick={toggle}>
                        CANCELAR
                    </Button>
                </ModalFooter>
            </Modal>
        </div >
    );
}

export default ModalGlobal
