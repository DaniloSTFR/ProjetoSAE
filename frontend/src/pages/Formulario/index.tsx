import Questoes from "components/Questoes";
import React from "react";

const Formulario = () => {
    return (
        <>
            
            <div className="container">
                <div className="jumbotron">
                    <h1 className="h2">Formulário</h1>
                    <p className="lead">ASSISTÊNCIA DE ENFERMAGEM AO IDOSO NA ATENÇÃO PRIMARIA À SAÚDE</p>
                    <hr />
                </div>

                <div>
                    <Questoes />
                </div>
            </div>
            
        </>
    );
}

export default Formulario;

