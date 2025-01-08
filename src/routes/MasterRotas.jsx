import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { UsuarioMaster } from '../contexts/UsuarioMaster';
import Barbearia from '../master/Barbearia';
import ModalSairUsuario from '../ModalSairUsuario';
import Barbearias from '../master/Barbearias';
import Reservas from '../master/Reservas';

const MasterRotas = () => {
    return (
        <>
            <BrowserRouter>
                <div className="d-flex justify-content-end">
                    <ModalSairUsuario />
                </div>
                <Routes>
                    <Route path="/" element={<Barbearias />} />
                    <Route path="/barbearia" element={<Barbearia />} />
                    <Route path="/barbearia/reserva" element={<Reservas />} />
                </Routes>
            </BrowserRouter>
        </>


    )
}

export default MasterRotas