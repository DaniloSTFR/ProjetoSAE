import Footer from "components/Footer"
import NavBar from "components/NavBar"
import React from "react"
import { Link } from "react-router-dom"

const Home = () => {
    return (
        <>
            <NavBar />
            <div className="container">
                <div className="jumbotron">
                    <h1 className="display-4">Projeto SAE</h1>
                    <p className="lead">Sistematização da Assistência de Enfermagem</p>
                    <hr />
                    <p>Esta aplicação consiste em auxiliar a SAE no diagnósticos de enfermagem.</p>
                    <p>Os diagnósticos de enfermagem surgiram como uma necessidade de dar nome 
                        ao que os enfermeiros identificavam a partir do pensamento crítico e o 
                        raciocínio clínico, competências adquiridas pelo enfermeiro e essenciais 
                        para o cuidado. Além disso, o diagnóstico de enfermagem é parte da 
                        Sistematização da Assistência de Enfermagem (SAE) e ação privativa do
                         enfermeiro, conforme a Resolução COFEN 358/2009.</p>
                     <h5>NANDA Internacional</h5>
                      <p>A NANDA Internacional surgiu no ano de 1982 como uma forma de 
                        uniformizar os diagnósticos de enfermagem tornando a linguagem única e 
                        facilitando o uso de terminologias pelos enfermeiros.</p>    
                    <div>
                        <Link className="btn btn-primary btn-lg" to="/formulario">
                            Acessar o Formulário
                        </Link>
                    </div>
                    <br/>
                    <div>
                        <Link className="btn btn-primary btn-lg" to="/dashboard">
                            Acessar o Dashboard
                        </Link>
                    </div>
                    <br/>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Home;
