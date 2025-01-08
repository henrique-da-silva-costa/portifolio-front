import './App.css';
import { useContext, useEffect, useState } from 'react';
import { Usuario } from './contexts/Usuario';
import LoginRotas from './routes/LoginRotas';
import PadraoRotas from './routes/PadraoRotas';
import { UsuarioMaster } from './contexts/UsuarioMaster';
import MasterRotas from './routes/MasterRotas';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function App() {
  const { auth, setAuth } = useContext(Usuario);
  const { authMaster, setAuthMaster } = useContext(UsuarioMaster);

  useEffect(() => {

    // if (sessionStorage.getItem("usuarioId")) {

    // }

    axios.get("http://localhost:8000/usuario", { params: { "id": sessionStorage.getItem("usuarioId") } }).then((res) => {
      if (!res.data.id) {
        setAuth(false)
        setAuthMaster(false)
      }
    }).catch((err) => {
      setAuth(false)
      setAuthMaster(false)
    })
  }, [])

  if (authMaster) {
    return <MasterRotas />
  }

  return auth != true ? <LoginRotas /> : <PadraoRotas />

}

export default App;
