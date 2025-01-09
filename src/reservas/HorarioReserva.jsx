import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Carregando from '../Carregando';
import { Table } from 'reactstrap';

const HorarioReserva = ({ barbearia_id }) => {
    const [horarios, setHorarios] = useState([]);
    const [msg, setMsg] = useState("");
    const [removerLoading, setRemoverLoading] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            axios.get("http://127.0.0.1:8000/barbearia/horarios/normal", { params: { "barbearia_id": barbearia_id } }).then((res) => {
                setHorarios(res.data);
                setRemoverLoading(true);
            }).catch((err) => {
                setMsg("erro interno servidor, entre em  contato com o suporte");
            })
        }, 1000);
    }, []);

    return (
        <>
            {horarios.length > 0 ?
                <Table responsive striped >
                    <thead>
                        <tr>
                            <th>horário</th>
                        </tr>
                    </thead>
                    <tbody>
                        <>
                            {horarios.length > 0 ? horarios.map((horario, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{horario.horario}</td>
                                    </tr>
                                )
                            }) : ""}
                        </>
                    </tbody>
                </Table >
                : ""}
            {!removerLoading ? <Carregando /> : horarios.length > 0 ? "" : <h2 className="text-center">SEM INFORMAÇÕES</h2>}
        </>
    )
}

export default HorarioReserva
