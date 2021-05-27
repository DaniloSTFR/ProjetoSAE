import Footer from "components/Footer";
import NavBar from "components/NavBar";
import Questoes from "components/Questoes";
import React from "react";

const Formulario = () => {
    return (
        <>
            <NavBar />
            <div className="container">
                <div className="jumbotron">
                    <h1 className="h2">Formulário</h1>
                    <p className="lead">AVALIAÇÃO GLOBAL DO IDOSO NA ATENÇÃO PRIMÁRIA</p>
                    <hr />
                </div>

                <div>
                    <Questoes />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Formulario;

