import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, FormGroup, Input, Label } from 'reactstrap';
import styles from "./Stylos.module.css";
import axios from 'axios';
import InputMask from "react-input-mask"
import { editarColunas, tipoInputMaskara, tipoInputPlaceholder, tipos, tiposLabel, valorCepFixos, valoresFixos, valoresLimiteMaximo, valoresNumericos } from './funcoesFormularios';

const ModalCadastrar = ({
    botaoAbrirNome = "",
    titulo = "",
    inputs = {},
    pegarDados = () => { },
    botaoformulario = "CADASTRAR",
    url = "",
    horarios = [],
    servicos = [],
    valorModal = false,
    reserva = false,
    placeholderNomeTipo = "nome",
    colunas = "",
    nomeFormulario = "",
    modalTelaCheia = false
}) => {

    const [modal, setModal] = useState(valorModal)
    const [msg, setMsg] = useState("")
    const [erros, setErros] = useState({});
    const [formularioValores, setFormularioValores] = useState(inputs);
    const [botaoDesabilitar, setBotaoDesabilitar] = useState(false);
    const [inputDesabilitar, setInputDesabilitar] = useState(false);
    const [botaoMsg, setBotaoMsg] = useState(botaoformulario);
    const nav = useNavigate();

    const toggle = () => {
        setFormularioValores(inputs)
        setErros({})
        setMsg("")
        setModal(!modal);
    };

    const pegarValorInput = (e) => {
        const { name, value, files } = e.target;

        const errocep = {};

        if (name == "cep" && value.length >= 8) {
            setInputDesabilitar(true)
            setBotaoMsg("CARREGANDO...");
            setBotaoDesabilitar(true);
            setTimeout(() => {
                axios.get(`https://viacep.com.br/ws/${value}/json/`).then((res) => {
                    Object.entries(formularioValores).map(([key, value]) => {
                        if (res.data.erro) {
                            if (key == "cep") {
                                errocep[key] = "CEP INVÁLIDO";
                                setErros(errocep);
                            }
                        } else {
                            setErros("");
                        }

                    });

                    const dados = Object.entries(res.data).map(([key, value]) => {
                        valorDefault(key);
                        if (valorCepFixos.includes(key)) {
                            return { key, value }
                        }
                    });

                    dados.forEach((element) => {
                        if (element) {
                            formularioValores[element.key] = element.value
                        }
                    });
                    setBotaoMsg(botaoformulario);
                    setBotaoDesabilitar(false);
                    setInputDesabilitar(false)
                    setFormularioValores(formularioValores);

                }).catch((err) => {
                    setBotaoMsg(botaoformulario);
                    setBotaoDesabilitar(false);
                    setInputDesabilitar(false)
                    if (err.erro) {
                        setMsg("CEP INVÁLIDO");
                    }
                });
            }, 1000);
        }

        setFormularioValores({
            ...formularioValores, [name]: name === "img" ? files[0] : value
        });
    };

    const valorDefault = (tipo = null) => {
        let resposta = "";

        Object.entries(formularioValores).map(([key, valor]) => {
            if (key === tipo) {
                resposta = valor;
            }
        });

        return resposta;
    }

    const tipoInput = (tipo) => {
        if (tipo == "horario") {
            return <select defaultValue={formularioValores.horario

            } name={tipo} onChange={(e) => formularioValores.horario = e.target.value} className="form-control" >
                <option value="" >SELECIONE</option>
                <option value="08:00:00">08:00</option>
                <option value="09:00:00">09:00</option>
                <option value="10:00:00">10:00</option>
                <option value="11:00:00">11:00</option>
                <option value="12:00:00">12:00</option>
                <option value="13:30:00">13:30</option>
                <option value="14:00:00">14:00</option>
                <option value="15:00:00">15:00</option>
                <option value="16:00:00">16:00</option>
                <option value="17:00:00">17:00</option>
                <option value="18:00:00">18:00</option>
            </select >
        }

        if (tipo == "hora") {
            return <select name={tipo} onChange={(e) => formularioValores.hora = e.target.value} className="form-control" >
                <option value={""}>SELECIONE...</option>
                {
                    horarios.length > 0 ? horarios.map((h, i) => {
                        return (
                            <option key={i} value={h.horario}>{h.horario}</option>
                        )
                    }) : ""
                }
            </select >
        }

        if (tipo == "servico") {
            return <select name={tipo} onChange={(e) => formularioValores.servico = e.target.value} className="form-control" value={formularioValores.tipo} >
                <option value={""}>Selecione...</option>
                {servicos.length > 0 ? servicos.map((s, i) => {
                    return (
                        <option key={i} value={s.id}>{s.nome}</option>
                    )
                }) : ""}
            </select>
        }

        if (tipo == "img") {
            return <Input
                placeholder={tipoInputPlaceholder(tipo)}
                disabled={inputDesabilitar}
                defaultValue={valorDefault(tipo)}
                name={tipo}
                accept="image/*"
                value={formularioValores.tipo}
                type={tipos(tipo)}
                onChange={pegarValorInput}
            />
        }

        return <InputMask
            placeholder={tipoInputPlaceholder(tipo, placeholderNomeTipo)}
            className="form-control"
            mask={tipoInputMaskara(tipo)}
            disabled={inputDesabilitar}
            name={tipo}
            value={valorDefault(tipo)}
            type={tipos(tipo)}
            onChange={pegarValorInput}
        />
    }

    const cadastrar = (e) => {
        e.preventDefault();

        setBotaoMsg("CARREGANDO...");
        setBotaoDesabilitar(true);

        const newErrors = {};

        axios.post(`http://127.0.0.1:8000/${url}`, formularioValores).then((res) => {
            for (const [key, value] of Object.entries(formularioValores)) {
                if (value && !valoresFixos.includes(key)) {
                    newErrors[key] = "";
                }

                setErros(newErrors);

                if (!value && key != "encript" && key != "barbearia_id") {
                    newErrors[key] = "Campo vazio";
                }

                else if (key === "email" && !/\S+@\S+\.\S+/.test(value)) {
                    newErrors[key] = "O E-mail deve ser válido.";
                }

                else if (key === "encript") {
                    newErrors[key] = "";
                }

                if (value && !valoresFixos.includes(key)) {
                    newErrors[key] = "";
                }

                if (res.data.error) {
                    setMsg(res.data.msg)
                    setModal(true);
                    setBotaoMsg(botaoformulario);
                    setBotaoDesabilitar(false);
                    return;
                }

                setErros(newErrors);
            }

            if (reserva) {
                for (const [key, value] of Object.entries(formularioValores)) {
                    if (!value) {
                        setBotaoMsg(botaoformulario);
                        setBotaoDesabilitar(false);
                        return;
                    }
                }

                setBotaoMsg(botaoformulario);
                setBotaoDesabilitar(false);
                localStorage.setItem("reserva", JSON.stringify(formularioValores));
                nav("/pagamento")
            }

            setMsg("");
            pegarDados();
            setBotaoMsg(botaoformulario);
            setBotaoDesabilitar(false);
            setModal(false);

        }).catch((err) => {
            for (const [key, value] of Object.entries(formularioValores)) {
                if (!err.response) {
                    setMsg("Erro interno no servidor, contate o suporte")
                    setBotaoMsg(botaoformulario);
                    setBotaoDesabilitar(false);
                    setErros("");
                    return;
                }

                if (err.response.data) {
                    if (valoresLimiteMaximo.includes(key) && value.length > 255) {
                        newErrors[key] = "Esse campo não pode ter mais que 255 caracteres";
                    }

                    if (key == "numero" && value.length > 10) {
                        newErrors[key] = "Esse campo não pode ter mais que 10 caracteres";
                    }

                    if (valoresNumericos.includes(key) && value != Number) {
                        newErrors[key] = "Esse campo deve ser numérico"
                    }
                }

                if (!value && key != "encript" && key != "barbearia_id") {
                    newErrors[key] = "Campo vazio";
                }

                else if (key === "email" && !/\S+@\S+\.\S+/.test(value)) {
                    newErrors[key] = "O e-mail deve ser válido.";
                }

                else if (key === "encript") {
                    newErrors[key] = "";
                }


                if (value && !valoresFixos.includes(key)) {
                    setModal(valorModal);
                }

                setMsg("");
                pegarDados();
                setBotaoMsg(botaoformulario);
                setBotaoDesabilitar(false);
                setModal(false);

                setErros(newErrors);
            }
            setModal(true);
        })
    }

    return (
        <div>
            <Button color="success" onClick={toggle}>{botaoAbrirNome}</Button>
            <Modal isOpen={modal} fullscreen={modalTelaCheia}>
                <ModalHeader toggle={toggle}>{titulo}</ModalHeader>
                <ModalBody>
                    <form onSubmit={cadastrar}>
                        <FormGroup>
                            <div className="row">
                                {formularioValores ? Object.keys(formularioValores).map((valores, i) => (
                                    <div key={i} className={editarColunas(colunas, valores, nomeFormulario)}>
                                        <Label className={styles.capitalize}>{tiposLabel(valores)}</Label>

                                        {
                                            tipoInput(valores)
                                        }

                                        {erros[valores] && <p className={styles.erro} >{erros[valores]}</p>}
                                    </div>
                                )) : ""
                                }
                            </div>
                        </FormGroup>
                        <p className={styles.erro}>{msg}</p>
                        <div className='d-flex gap-2 justify-content-end'>
                            <Button color="danger" disabled={botaoDesabilitar} onClick={toggle}>
                                CANCELAR
                            </Button>
                            <Button color="success" disabled={botaoDesabilitar}>{botaoMsg}</Button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        </div >
    )
}

export default ModalCadastrar
