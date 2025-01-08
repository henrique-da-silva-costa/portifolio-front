import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Naoencontrado from '../Naoencontrado';
import Home from '../reservas/Home';
import Barbearia from '../reservas/Barbearia';
import ModalSairUsuario from '../ModalSairUsuario';
import Pagamento from '../pagamentos/Pagamento';

const PadraoRotas = () => {
    return (
        <>
            <BrowserRouter>
                <div className="d-flex justify-content-end">
                    <ModalSairUsuario />
                </div>
                <Routes>
                    <Route path='/pagamento' element={<Pagamento />} />
                    <Route path='/barbearias/:id' element={<Barbearia />} />
                    <Route path='/' element={<Home />} />
                    <Route path='*' element={<Naoencontrado />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default PadraoRotas