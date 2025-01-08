import { createContext, useEffect, useState } from "react";

export const Usuario = createContext({});

export function UsuarioLogin({ children }) {

    const [auth, setAuth] = useState(() => {
        const savedState = localStorage.getItem("appState");
        return savedState ? JSON.parse(savedState) : false;
    });

    const [id, setId] = useState(() => {
        const savedStateId = localStorage.getItem("id");
        return savedStateId ? JSON.parse(savedStateId) : false;
    });

    const [nome, setNome] = useState(() => {
        const savedStateNome = localStorage.getItem("nome");
        return savedStateNome ? JSON.parse(savedStateNome) : false;
    });

    useEffect(() => {
        localStorage.setItem("appState", JSON.stringify(auth));
    }, [auth]);

    return (
        <Usuario.Provider value={{ auth, setAuth }}>
            {children}
        </Usuario.Provider>
    )
}

export default UsuarioLogin;