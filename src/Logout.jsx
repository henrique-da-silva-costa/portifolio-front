import React from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = () => {

    const nav = useNavigate();

    useEffect(() => {
        nav("/");
    }, [])


    return (
        <>

        </>
    )
}

export default Logout
