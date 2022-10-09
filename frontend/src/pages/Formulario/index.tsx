import Questoes from "components/Questoes";
import React from "react";

import { Usuario } from 'types/Usuario';

type Props = {
    usuarioContext: Usuario | undefined;
    historyRouter: any;
    numeroprontuario: number
    //toHomeComponent: Function;
}

const Formulario = ({ usuarioContext, historyRouter, numeroprontuario }: Props) => {
    console.log(usuarioContext);
    return (
        <>
            
            <div className="container">
                <div className="jumbotron">
                    <h1 className="h2">Formulário</h1>
                    <p className="lead">ASSISTÊNCIA DE ENFERMAGEM AO IDOSO NA ATENÇÃO PRIMARIA À SAÚDE</p>
                    <hr />
                </div>

                <div>
                    <Questoes usuarioContext = {usuarioContext} historyRouter = {historyRouter} numeroprontuario = {numeroprontuario}/>
                </div>
            </div>
            
        </>
    );
}

export default Formulario;

