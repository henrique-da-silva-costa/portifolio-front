import React from 'react'
import Cartao from './Cartao'
import ModalGlobal from '../modais/ModalGlobal'
import Pix from './Pix'
import { Container } from 'reactstrap'

const Pagamento = () => {
    return (
        <Container className="p-2">
            <ModalGlobal conteudo={<Pix />} botaoAbrirNome={"PAGAR COM PIX"} />
            <Cartao />
        </Container>
    )
}

export default Pagamento
