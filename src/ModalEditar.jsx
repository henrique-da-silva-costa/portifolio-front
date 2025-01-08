import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label } from 'reactstrap';
import styles from "./Stylos.module.css";
import axios from 'axios';
import InputMask from "react-input-mask"
import { editarColunas, tipoInputMaskara, tipoInputPlaceholder, tipos, tiposLabel, valorCepFixos, valoresFixos, valoresLimiteMaximo, valoresNumericos } from './funcoesFormularios';

const ModalEditar = ({
    pegarDados = () => { },
    botaoAbrirNome = "EDITAR",
    titulo = "",
    inputs = {},
    botaoformulario = "CADASTRAR",
    horarios = [],
    servicos = [],
    id = null,
    url = "",
    urlEditar = "",
    placeholderNomeTipo = "nome",
    nomeFormulario = "",
    colunas = "",
    colunasDeCep = false,
    modalTelaCheia = false
}) => {

    const [frmValor, setFrmValor] = useState([]);
    const [msg, setMsg] = useState([]);
    const [frmValorVarios, setFrmValorVarios] = useState([]);
    const [modal, setModal] = useState(false);
    const [erros, setErros] = useState({});
    const [botaoDesabilitar, setBotaoDesabilitar] = useState(false);
    const [inputDesabilitar, setInputDesabilitar] = useState(false);
    const [botaoMsg, setBotaoMsg] = useState(botaoformulario);
    const [formularioValores, setFormularioValores] = useState(inputs);

    const toggle = () => {
        setFormularioValores(inputs)
        setMsg("")
        setModal(!modal)
    }

    const toggleInput = () => {
        axios.get(`http://localhost:8000/${url}`, { params: { id: id } }).then((res) => {
            let ordenado = {
                nome: res.data.nome,
                telefone: res.data.telefone,
                cep: res.data.cep,
                estado: res.data.estado,
                localidade: res.data.localidade,
                bairro: res.data.bairro,
                logradouro: res.data.logradouro,
                numero: res.data.numero,
                id: res.data.id,
                usuarios_id: res.data.usuarios_id,
            }

            setFormularioValores(colunasDeCep ? ordenado : res.data);
            const dados = Object.entries(res.data).map(([key, value]) => {
                return { key, value };
            });

            if (dados[0] ? dados[0].value : []) {
                const dadosVarios = Object.entries(dados[0] ? dados[0].value : []).map(([key, value]) => {
                    return { key, value };
                });

                setFrmValorVarios(dadosVarios);
            }

            setFrmValor(dados);
            setModal(!modal)

        }).catch((err) => {
            alert("Erro interno no servidor, contate o suporte");
        })
    }

    const pegarValorInput = (e) => {
        const { name, value, files } = e.target;

        if (name == "cep" && value.length >= 8) {
            setInputDesabilitar(true)
            setBotaoMsg("CARREGANDO...");
            setBotaoDesabilitar(true);
            setTimeout(() => {
                axios.get(`https://viacep.com.br/ws/${value}/json/`).then((res) => {
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

    const valorDefault = (valor) => {
        let resposta = "";

        if (frmValorVarios.length > 0) {
            frmValorVarios.forEach(element => {
                if (element.key === valor) {
                    resposta = element.value;
                }
            });
        }

        frmValor.forEach(element => {
            if (element.key === valor) {
                resposta = element.value;
            }
        });

        return resposta;
    }

    const valorDefaultCep = (tipo) => {

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
            return <select defaultValue={valorDefault(tipo)} name={tipo} onChange={(e) => formularioValores.horario = e.target.value} className="form-control" >
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
                    horarios ? horarios.map((h, i) => {
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
                {servicos ? servicos.map((s, i) => {
                    return (
                        <option key={i} value={s.id}>{s.nome}</option>
                    )
                }) : ""}
            </select>
        }

        if (tipo == "img") {
            return <Input
                disabled={inputDesabilitar}
                name={tipo}
                accept="image/*"
                value={formularioValores.tipo}
                type={tipos(tipo)}
                onChange={pegarValorInput}
            />
        }

        return <InputMask
            className="form-control"
            placeholder={tipoInputPlaceholder(tipo, placeholderNomeTipo)}
            mask={tipoInputMaskara(tipo)}
            disabled={inputDesabilitar}
            name={tipo}
            defaultValue={valorDefault(tipo)}
            value={formularioValores.cep ? valorDefaultCep(tipo) : formularioValores.tipo}
            type={tipos(tipo)}
            onChange={pegarValorInput}
        />
    }

    const editar = (e) => {
        e.preventDefault();

        setBotaoMsg("CARREGANDO...");
        setBotaoDesabilitar(true);

        const newErrors = {};

        axios.put(`http://127.0.0.1:8000/${urlEditar}`, formularioValores).then((res) => {
            for (const [key, value] of Object.entries(formularioValores)) {
                if (value && !valoresFixos.includes(key)) {
                    newErrors[key] = "";
                }

                setErros(newErrors);

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
                    newErrors[key] = "";
                    setModal(true);
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

                if (valoresNumericos.includes(key) && value != Number) {
                    newErrors[key] = "Esse campo deve ser numerico"
                }

                if (err.response.data) {
                    if (valoresLimiteMaximo.includes(key) && value.length > 255) {
                        newErrors[key] = "Esse campo não pode ter mais que 255 caracteres";
                    }

                    if (key == "numero" && value.length > 10) {
                        newErrors[key] = "Esse campo não pode ter mais que 10 caracteres";
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
                    setModal(true);
                }

                setErros(newErrors);
            }

            if (!err.response) {
                setMsg("Erro interno no servidor, contate o suporte")
                setErros("");
            }

            setBotaoMsg(botaoformulario);
            setBotaoDesabilitar(false);
            setModal(true);
        });
    }

    return (

        <div>
            <Button color="success" onClick={toggleInput}>{botaoAbrirNome}</Button>
            <Modal isOpen={modal} fullscreen={modalTelaCheia}>
                <ModalHeader toggle={toggle}>{titulo}</ModalHeader>
                <ModalBody>
                    <Form onSubmit={editar}>
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
                    </Form>
                </ModalBody>
            </Modal>
        </div >
    )
}

export default ModalEditar
