import { createContext, useEffect, useState } from "react";

export const UsuarioMaster = createContext();

export const UsuarioMasterLogin = ({ children }) => {
    const [authMaster, setAuthMaster] = useState(() => {
        const savedState = localStorage.getItem("appStateMaster");
        return savedState ? JSON.parse(savedState) : false;
    });

    useEffect(() => {
        localStorage.setItem("appStateMaster", JSON.stringify(authMaster));
    }, [authMaster]);

    return (
        <UsuarioMaster.Provider value={{ authMaster, setAuthMaster }}>
            {children}
        </UsuarioMaster.Provider>
    )
}

export default UsuarioMasterLogin;