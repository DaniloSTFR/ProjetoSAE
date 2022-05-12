import Footer from "components/Footer"
import NavBar from "components/NavBar"
import React from "react"
import { Link } from "react-router-dom"

const Home = () => {
    return (
        <>
            <NavBar />
            <div className="container">
                <div className="jumbotron" style={{textAlign: "justify"}}>
                    <h1 className="display-4">Projeto enfSenior</h1>
                    <p className="lead">Sistematização da assistência de enfermagem ao idoso na atenção primária à saúde.</p>
                    <hr />

                    <p>O projeto tem como objetivo auxiliar o enfermeiro na realização da consulta de
                    enfermagem ao idoso na atenção primária à saúde, buscando implementar a sistematização
                    da assistência de enfermagem.</p>
                    <p>A SAE é um dos instrumentos de trabalho do profissional
                    enfermeiro que embasa no que tange o conhecimento científico sendo uma ação privativa do
                           enfermeiro, conforme a Resolução COFEN 358/2009.</p>
                    {/*                      <h5>NANDA Internacional</h5>
                      <p>A NANDA Internacional surgiu no ano de 1982 como uma forma de 
                        uniformizar os diagnósticos de enfermagem tornando a linguagem única e 
                        facilitando o uso de terminologias pelos enfermeiros.</p>     */}
                    <div>
                        <Link className="btn btn-primary btn-lg" to="/formulario">
                            Acessar o Formulário
                        </Link>
                    </div>
                    <br />
                    {/*                     <div>
                        <Link className="btn btn-primary btn-lg" to="/dashboard">
                            Acessar o Dashboard
                        </Link>
                    </div> */}
                    <br />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Home;
