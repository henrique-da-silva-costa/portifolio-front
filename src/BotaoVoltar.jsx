import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

const BotaoVoltar = ({ url = -1 }) => {
    const nav = useNavigate();

    const voltar = () => {
        nav(url);
    }

    return (

        <Button color="transparent" onClick={voltar}><FaArrowLeft size={35} /></Button>
    )
}

export default BotaoVoltar