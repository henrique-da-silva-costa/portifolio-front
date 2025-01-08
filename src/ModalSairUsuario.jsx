import React, { useContext, useState } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, Button } from 'reactstrap';
import { Usuario } from './contexts/Usuario';
import styles from "./Stylos.module.css"
import { UsuarioMaster } from './contexts/UsuarioMaster';
import UsuarioLogo from "./user-icon-2098873_1920.png"
import { useNavigate } from 'react-router-dom';

const ModalSairUsuario = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [nome] = useState(sessionStorage.getItem("usuarioNome") ? JSON.parse(sessionStorage.getItem("usuarioNome")) : "")
    const [img] = useState(sessionStorage.getItem("usuarioImg") ? sessionStorage.getItem("usuarioImg") : UsuarioLogo)
    const { auth, setAuth } = useContext(Usuario);
    const { authMaster, setAuthMaster } = useContext(UsuarioMaster);
    const nav = useNavigate();

    const logout = () => {
        if (auth) {
            setAuth(false)
            nav("/");
        } else if (authMaster) {
            setAuthMaster(false);
            nav("/barbeiro");
        }

        sessionStorage.setItem("usuarioId", "");
        sessionStorage.setItem("usuarioNome", "");
    }

    const toggle = () => setDropdownOpen((prevState) => !prevState);
    return (
        <>
            <div className={styles.logoUsuarioAbsolute}>
                <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={"down"}>
                    <DropdownToggle color="transparent"> <div className="d-flex flex-column align-items-center mb-2 border-0">
                        <img className="rounded-circle" src={img} alt="imagen do usuário" height={50} width={50} />
                    </div></DropdownToggle>
                    <DropdownMenu className="mt-2 p-1">
                        <div className="d-flex flex-column align-items-center mb-2">
                            <img className="rounded-circle" src={img} alt="imagen do usuário" height={100} width={100} />
                            <h4 className="text-center">{nome.length > 15 ? nome.slice(0, 15) + "..." : nome}</h4>
                        </div>
                        <div className="text-end">
                            <Button color="danger" onClick={logout}>SAIR</Button>
                        </div>
                    </DropdownMenu>
                </Dropdown>
            </div >
        </>

    )
}

export default ModalSairUsuario