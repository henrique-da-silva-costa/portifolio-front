import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cadastro from '../usuario/Cadastro'
import RecuperarSenha from '../usuario/RecuperarSenha'
import RecuperarSenhaEmail from '../usuario/RecuperarSenhaEmail'
import Login from '../usuario/Login'
import Loginmaster from '../usuario/Loginmaster'
import Naoencontrado from '../Naoencontrado'
import CadastroMaster from '../usuario/CadastroMaster'

const LoginRotas = () => {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/barbeiro' element={<Loginmaster />} />
                    <Route path='/' element={<Login />} />
                    <Route path='/cadastro' element={<Cadastro />} />
                    <Route path='/cadastrobarbeiro' element={<CadastroMaster />} />
                    <Route path='/recuperarsenha' element={<RecuperarSenha />} />
                    <Route path='/recuperarsenha/email' element={<RecuperarSenhaEmail />} />
                    <Route path='*' element={<Naoencontrado />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default LoginRotas