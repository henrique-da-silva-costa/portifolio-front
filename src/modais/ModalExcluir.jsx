import axios from 'axios';
import React, { useState } from 'react'
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import styles from "../Stylos.module.css";

const ModalExcluir = ({ titulo = "EXCLUIR", id = null, url, pegarDados = () => { } }) => {
    const [modal, setModal] = useState(false);
    const [msg, setMsg] = useState("");
    const [botaoDesabilitar, setBotaoDesabilitar] = useState(false);
    const [botaoMsg, setBotaoMsg] = useState("EXCLUIR");

    const toggle = () => {
        setModal(!modal);
    };

    const excluir = () => {
        setBotaoDesabilitar(true);
        setBotaoMsg("CAREGANDO...");

        axios.delete(`http://127.0.0.1:8000/${url}`, { params: { "id": id } }).then((res) => {
            if (res.data.error) {
                setMsg(res.data.msg);
                setBotaoDesabilitar(false);
                setBotaoMsg("EXCLUIR");
                return;
            }

            setModal(false);
            pegarDados();
            setBotaoDesabilitar(false);
            setBotaoMsg("EXCLUIR");
        }).catch((err) => {
            setModal(true);
            if (!err.response) {
                setMsg("Erro interno no servidor, contate o suporte")
            }
            setBotaoDesabilitar(false);
            setBotaoMsg("EXCLUIR");
        });
    }

    return (
        <div>
            <Button color="danger" onClick={toggle}>EXCLUIR</Button>
            <Modal isOpen={modal}>
                <ModalHeader toggle={toggle}>{titulo}</ModalHeader>
                <ModalBody className="d-flex gap-2 flex-column justify-content-end">
                    <div className="d-flex gap-2 justify-content-end">
                        <Button color="secondary" disabled={botaoDesabilitar} onClick={toggle}>
                            CANCELAR
                        </Button>
                        <Button color="danger" disabled={botaoDesabilitar} onClick={excluir}>{botaoMsg}</Button>
                    </div>
                    <div className="text-end">
                        <p className={styles.erro}>{msg}</p>
                    </div>
                </ModalBody>
            </Modal>
        </div >
    );
}

export default ModalExcluir
