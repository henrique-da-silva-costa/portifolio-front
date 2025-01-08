import React, { useEffect } from 'react'
import { use } from 'react';
import { useNavigate } from 'react-router-dom'

const Naoencontrado = () => {

    const nav = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            nav("/");
        }, 3000);
    }, [])

    return (
        <h1>Pagina não encontrada</h1>
    )
}

export default Naoencontrado