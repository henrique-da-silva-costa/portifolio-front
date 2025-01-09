import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Barbearia from '../master/Barbearia';
import ModalSairUsuario from '../ModalSairUsuario';
import Barbearias from '../master/Barbearias';
import Reservas from '../master/Reservas';
import Naoencontrado from "../Naoencontrado"

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
                    <Route path='*' element={<Naoencontrado />} />
                </Routes>
            </BrowserRouter>
        </>


    )
}

export default MasterRotas