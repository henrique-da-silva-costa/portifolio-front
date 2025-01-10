import { Button, FormGroup, Input, Label } from 'reactstrap';
import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from "./Stylos.module.css";
import axios from 'axios';
import { UsuarioMaster } from './contexts/UsuarioMaster';
import { Usuario } from './contexts/Usuario';
import { FaEye } from "react-icons/fa";
import Encrypt from "./sdk/pagseguro";
import InputMask from "react-input-mask"
import { editarColunas, tipoInputMaskara, tipoInputPlaceholder, tipos, tiposLabel, valoresLimiteMaximo, valoresLimiteMinimo } from './funcoesFormularios';

const Formularios = ({
    inputs = {},
    botaoformulario = "CADASTRAR",
    horarios = [],
    servicos = [],
    url = "",
    formularioLogin = false,
    linkNav = "",
    linkNavVazio = "",
    tipoLogin = "",
    loginBotoes = false,
    filtros = false,
    dados = "",
    totalPages = "",
    paginaAtual = "",
    colunas = "",
    recuperarSenhaEmail = false,
    pagamentoCartao = false,
    modalCartao = "",
    recuperarSenha = false,
    placeholderNomeTipo = "nome",
    nomeFormulario = ""
}) => {

    const [msg, setMsg] = useState("")
    const [tipoSenha, setTipoSenha] = useState("password");
    const [erros, setErros] = useState({});
    const [formularioValores, setFormularioValores] = useState(inputs);
    const [botaoDesabilitar, setBotaoDesabilitar] = useState(false);
    const [botaoMsg, setBotaoMsg] = useState(botaoformulario);
    const filtrosTipos = ["filtroCep", "filtroEstado", "filtroCidade"]
    const { setAuth } = useContext(Usuario);
    const { setAuthMaster } = useContext(UsuarioMaster);
    const [reserva] = useState(localStorage.getItem("reserva") ? JSON.parse(localStorage.getItem("reserva")) : {});

    const nav = useNavigate();

    const formRef = useRef()

    const limparFiltros = () => {
        formRef.current.reset();
        setFormularioValores({
            filtroNome: "",
            filtroCep: "",
            filtroEstado: "",
            filtroCidade: ""
        })

        setBotaoMsg("CARREGANDO...");
        setBotaoDesabilitar(true);

        axios.get("http://localhost:8000/barbearias/filtros", {
            params: {
                filtroNome: "",
                filtroCep: "",
                filtroEstado: "",
                filtroCidade: ""
            }
        }).then((res) => {
            dados(res.data.data)
            setBotaoDesabilitar(false);
            paginaAtual(res.data.current_page);
            totalPages(res.data.last_page);
            setBotaoMsg(botaoformulario);
        }).catch((err) => {
            setBotaoDesabilitar(false);
            setBotaoMsg(botaoformulario);
        })

        return

    };

    const mudarTipoSenha = (tipo) => {
        tipoSenha == "password" ? setTipoSenha("text") : setTipoSenha("password");
    }

    const pegarValorInput = (e) => {
        const { name, value, files } = e.target;

        setFormularioValores({
            ...formularioValores, [name]: name === "img" ? files[0] : value
        });
    };

    const tipoInput = (tipo) => {
        const tiposSenha = ["senha", "novasenha", "confirmasenha"];

        if (tipo == "hora") {
            return <select name={tipo} disabled={botaoDesabilitar} onChange={(e) => formularioValores.hora = e.target.value} className="form-control" >
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
            return <select name={tipo} disabled={botaoDesabilitar} onChange={(e) => formularioValores.servico = e.target.value} className="form-control" value={formularioValores.tipo} >
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
                name={tipo}
                accept="image/*"
                value={formularioValores.tipo}
                type={tipos(tipo)}
                onChange={pegarValorInput}
                disabled={botaoDesabilitar}
            />
        }

        if (tiposSenha.includes(tipo)) {
            return <div className="d-flex gap-2">
                <Input
                    id={tipo}
                    placeholder={tipoInputPlaceholder(tipo, placeholderNomeTipo)}
                    name={tipo}
                    value={formularioValores.tipo}
                    type={tipoSenha}
                    onChange={pegarValorInput}
                    disabled={botaoDesabilitar}
                />
                <Button color="transparent" className="border border-0" onClick={() => mudarTipoSenha(tipo)}><FaEye /></Button>
            </div>

        }

        return <InputMask
            placeholder={tipoInputPlaceholder(tipo, placeholderNomeTipo)}
            mask={tipoInputMaskara(tipo)}
            id={tipo}
            className="form-control"
            name={tipo}
            value={formularioValores.tipo}
            type={tipos(tipo)}
            onChange={pegarValorInput}
            disabled={botaoDesabilitar}
        />
    }

    const enviar = (e) => {
        e.preventDefault();
        const newErrors = {};

        setBotaoMsg("CARREGANDO...");
        setBotaoDesabilitar(true);

        for (const [key, value] of Object.entries(formularioValores)) {
            if (filtrosTipos.includes(key)) {
                axios.get("http://localhost:8000/barbearias/filtros", { params: formularioValores }).then((res) => {
                    dados(res.data.data)
                    setBotaoDesabilitar(false);
                    paginaAtual(res.data.current_page);
                    totalPages(res.data.last_page);
                    setBotaoMsg(botaoformulario);
                }).catch((err) => {
                    setBotaoDesabilitar(false);
                    setBotaoMsg(botaoformulario);
                })

                return;
            }
        }

        axios.post(`http://127.0.0.1:8000/${url}`, formularioValores, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((res) => {
            for (const [key, value] of Object.entries(formularioValores)) {
                if (!value) {
                    newErrors[key] = "Campo vazio";

                }

                else if (key === "email" && !/\S+@\S+\.\S+/.test(value)) {
                    newErrors[key] = "O e-mail deve ser válido.";
                }

                else if (key === "barbearia_id") {
                    newErrors[key] = "";
                }

                else if (key === "master") {
                    newErrors[key] = "";
                }

                if (key === "encript") {
                    newErrors[key] = "";
                }

                if (res.data.error) {
                    setMsg(res.data.msg)
                    setBotaoMsg(botaoformulario);
                    setBotaoDesabilitar(false);
                    return;
                }

                if (recuperarSenhaEmail) {
                    localStorage.setItem("email", formularioValores.email ? JSON.stringify(formularioValores.email) : "")
                }

                if (recuperarSenha) {
                    localStorage.setItem("email", "")
                }
            }

            if (pagamentoCartao) {
                formularioValores.encript = Encrypt(formularioValores) ? Encrypt(formularioValores) : "";

                if (!formularioValores.encript) {
                    setMsg("Dados do Cartão invalidos");
                    setBotaoDesabilitar(false);
                    setBotaoMsg(botaoformulario);
                    return
                }

                const reservar = (dados) => {
                    axios.post("http://127.0.0.1:8000/reserva", dados).then((res) => {
                        if (res.data.erro) {
                            setMsg("Algo deu errado")
                        }
                    }).catch((err) => {
                        setMsg("Erro interno no servidor, entre em contato com o suporte")
                    });
                }

                reservar(reserva);

                setMsg("");

                modalCartao(true);

                setTimeout(() => {
                    modalCartao(false);

                    localStorage.setItem("reserva", "");

                    nav("/");
                }, 3000);
            }

            if (formularioLogin) {
                sessionStorage.setItem("usuarioId", res.data.usuario["id"] ? JSON.stringify(res.data.usuario["id"]) : "")
                sessionStorage.setItem("usuarioNome", res.data.usuario["nome"] ? JSON.stringify(res.data.usuario["nome"]) : "");
                sessionStorage.setItem("usuarioImg", res.data.usuario["img"] ? "http://127.0.0.1:8000" + res.data.usuario["img"] : "");

                if (tipoLogin == "login") {
                    res.data.error ? setAuth(false) : setAuth(true);
                    nav("/");
                } else {
                    res.data.error ? setAuthMaster(false) : setAuthMaster(true);
                    nav("/");
                }

                setMsg("");
                setBotaoMsg(botaoformulario);
                setBotaoDesabilitar(false);
                setErros(newErrors);
                return;
            }

            res.data.error ? nav(linkNav) : nav(linkNavVazio);

            setMsg("");
            setBotaoMsg(botaoformulario);
            setBotaoDesabilitar(false);
            setErros(newErrors);

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

                    if (valoresLimiteMinimo.includes(key) && value.length < 3) {
                        newErrors[key] = "Esse campo não pode ter menos que 3 caracteres";
                    }
                }

                if (!value && key != "encript" && key != "barbearia_id" && key != "master") {
                    newErrors[key] = "Campo vazio";
                }

                else if (key === "email" && !/\S+@\S+\.\S+/.test(value)) {
                    newErrors[key] = "O e-mail deve ser válido.";
                }

                else if (key === "encript") {
                    newErrors[key] = "";
                }

                setMsg("");
                setBotaoMsg(botaoformulario);
                setBotaoDesabilitar(false);

                if (formularioLogin) {
                    if (tipoLogin == "login") {
                        setAuth(false)
                    } else {
                        setAuthMaster(false)
                    }
                }

                setErros(newErrors);
            }

            if (!err.response) {
                setMsg("Erro interno no servidor, contate o suporte")
                setErros("");
            }
        })

        setErros(newErrors);
    }

    return (
        <>
            {formularioValores.img ? <img src={URL.createObjectURL(formularioValores.img)} alt="" height={100} width={100} /> : ""}
            <form ref={formRef} onSubmit={enviar}>
                <FormGroup>
                    <div className="row">
                        {formularioValores ? Object.keys(formularioValores).map((valores, i) => (
                            <div key={i} className={editarColunas(colunas, valores, nomeFormulario)}>
                                <Label htmlFor={valores} className={styles.capitalize}>{tiposLabel(valores)}</Label>

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
                    {filtros ? <Button type="button" color="secondary" disabled={botaoDesabilitar} onClick={limparFiltros}>LIMPAR</Button> : ""}
                    <Button color="success" disabled={botaoDesabilitar}>{botaoMsg}</Button>
                </div>
            </form >
            {loginBotoes ? <div className="d-flex gap-2 mt-2">
                <Button size="sm" disabled={botaoDesabilitar} onClick={() => nav(tipoLogin == "login" ? "/cadastro" : "/cadastrobarbeiro")}> CADASTRE - SE</Button >
                <Button size="sm" disabled={botaoDesabilitar} onClick={() => nav("/recuperarsenha/email")}>RECUPERAR SENHA</Button>
            </div > : ""}
        </>
    )
}

export default Formularios
