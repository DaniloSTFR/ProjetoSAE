import AnamneseEnfermagem from "components/AnamneseEnfermagem";
import React from "react";

import { Usuario } from 'types/Usuario';

type Props = {
    usuarioContext: Usuario | undefined;
    historyRouter: any;
    numeroprontuario: number
    setTitle: Function;
}

const Formulario = ({ usuarioContext, historyRouter, numeroprontuario, setTitle }: Props) => {
    return (
        <>
            <AnamneseEnfermagem usuarioContext = {usuarioContext} historyRouter = {historyRouter} 
                numeroprontuario = {numeroprontuario} setTitle = {setTitle}/>     
        </>
    );
}

export default Formulario;

