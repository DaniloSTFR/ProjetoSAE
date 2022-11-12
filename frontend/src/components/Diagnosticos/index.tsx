import api from 'services/api';
import { useEffect, useState } from 'react';
import { DiagnosticosItensTypes } from 'types/Diagnosticos';
import Accordion from 'react-bootstrap/Accordion';
import './styles.scss';

import { Usuario } from 'types/Usuario';

type KeyWordElements ={
    uuid:string; 
    idItem:number; 
    keyword:string;
}

type DiagnosticosItensTypesArr ={
    arr: [DiagnosticosItensTypes]
}

type Props = {
    keyWordElementsArray: KeyWordElements[];
    onClickedProntuarioPaciente: Function;
    selectDiagnostico: Function;
    numeroprontuario: number;
    usuarioContext: Usuario | undefined;
}

//const Diagnosticos = ({ onChecked, nInteno = "" }: Props) => {
const Diagnosticos = ({ keyWordElementsArray, onClickedProntuarioPaciente, selectDiagnostico, numeroprontuario, usuarioContext }: Props) => {   

    const [diagnosticosItensTypesArr, setDiagnosticosItensTypesArr] = useState<DiagnosticosItensTypesArr>({
            arr: [{
                _id:"",
                codigo_do_diagnostico: "",
                dominio: "",
                classe: "",
                definicao: "",
                keyword: [""],
                caracteristicas_definidoras : [""],
                condicoes_associadas : [""],
                fatores_relacionados : [""],
                populacao_em_risco : [""],
                fatores_de_risco : [""],
            }]
            });      

    console.log(keyWordElementsArray);
    useEffect(
        () => {

            async function doAnaliseDeDados() {
                const apiContext = await api();
                const response = await apiContext.post(`/analisededados`, { keyWordArrayRequest: keyWordElementsArray })
                const dados = response.data.respostaDagnostico as [DiagnosticosItensTypes];
                setDiagnosticosItensTypesArr({ arr: dados });
            }

            doAnaliseDeDados().finally(async () => {
                const apiContext = await api();
                console.log('Fim do Post Analise de dados dentro do Diagnosticos:');
                apiContext.post(`/create/rascunhoprontuarios`, { numeroprontuario, codUsuarioUuId: usuarioContext?.codUsuarioUuId, formKeysRascunhoJson: keyWordElementsArray })
            })
        },
        // eslint-disable-next-line    
        [keyWordElementsArray]);

    useEffect(() => {
        console.log(diagnosticosItensTypesArr);
    }, [diagnosticosItensTypesArr]);

    //console.log(keyWordElementsArray);
    useEffect(() => {
        toTop()
    }, []);

    function toTop(){
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }

    return (
        <>
            <div>
                <p>Os seguintes dignósticos foram indicados para o paciente. Defina o(s) dignostico(s) mais adequado(s):</p>
            </div>
            <div>
                {diagnosticosItensTypesArr.arr.length > 0 ? 
                (
                <div>
                    <div>
                        {diagnosticosItensTypesArr.arr.map((itens, index) =>

                            <div key={index}>

                                <div className="card">
                                    <h5 className="card-header">{itens.codigo_do_diagnostico}
                                        <input
                                            type="checkbox"
                                            value={`${itens._id}`}
                                            id={`${itens._id}`}
                                            name={`${itens._id}`}
                                            onChange={() => selectDiagnostico(itens)}
                                            /* checked = {checkFunction (`${valueOP}`)? true: false } */

                                            className="selectDiag form-check-input btn-outline-success"
                                        />
                                    </h5>

                                    <div className="card-body">
                                        <Accordion defaultActiveKey="0" flush>
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header><h5 className="card-title">Definição: </h5></Accordion.Header>
                                                <Accordion.Body><p className="card-text">{itens.definicao}</p></Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="1">
                                                <Accordion.Header><p className="card-text">Características definidoras:</p></Accordion.Header>
                                                <Accordion.Body>
                                                    <ul>
                                                        {itens.caracteristicas_definidoras.map((itkey, idx) =>
                                                            <li key={idx}>
                                                                {itkey}
                                                            </li>
                                                        )}
                                                        {itens.caracteristicas_definidoras.length < 1 ? "Nenhuma" : ""}
                                                    </ul>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="2">
                                                <Accordion.Header><p className="card-text">Condições associadas:</p></Accordion.Header>
                                                <Accordion.Body>
                                                    <ul>
                                                        {itens.condicoes_associadas?.map((itkey, idx) =>
                                                            <li key={idx}>
                                                                {itkey}
                                                            </li>
                                                        )}
                                                        {itens.condicoes_associadas.length < 1 ? "Nenhuma" : ""}
                                                    </ul>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="3">
                                                <Accordion.Header><p className="card-text">Fatores relacionados:</p></Accordion.Header>
                                                <Accordion.Body>
                                                    <ul>
                                                        {itens.fatores_relacionados?.map((itkey, idx) =>
                                                            <li key={idx}>
                                                                {itkey}
                                                            </li>
                                                        )}
                                                        {itens.fatores_relacionados.length < 1 ? "Nenhum" : ""}
                                                    </ul>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="4">
                                                <Accordion.Header><p className="card-text">Fatores de risco:</p></Accordion.Header>
                                                <Accordion.Body>
                                                    <ul>
                                                        {itens.fatores_de_risco?.map((itkey, idx) =>
                                                            <li key={idx}>
                                                                {itkey}
                                                            </li>
                                                        )}
                                                        {itens.fatores_de_risco.length < 1 ? "Nenhum" : ""}
                                                    </ul>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="5">
                                                <Accordion.Header><p className="card-text">Populações em risco::</p></Accordion.Header>
                                                <Accordion.Body>
                                                    <ul>
                                                        {itens.populacao_em_risco?.map((itkey, idx) =>
                                                            <li key={idx}>
                                                                {itkey}
                                                            </li>
                                                        )}
                                                        {itens.populacao_em_risco.length < 1 ? "Nenhuma" : ""}
                                                    </ul>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                        {/* <a href="#diagnosticos" className="btn btn-primary">Diagnóstico mais adequado</a>  */}
                                    </div>
                                </div>
                                <br />
                            </div>
                        )}
                    </div>

                    <div className="d-flex justify-content-center">
                        <button type="button" onClick={() => onClickedProntuarioPaciente(1)}
                            className="btn btn-success btn-lg text-center">Finalizar Diagnósticos
                        </button>
                    </div>
                </div>
                ): 
                    <p>Sem Diagnósticos</p>
                }
                
            </div>

        </>    
    );

}

export default Diagnosticos;

/*
Definição                
Características definidoras
Característica definidora
Código do diagnóstico    
Condições associadas     
Condição associada       
Fatores relacionados     
Fator relacionado        
População em risco       
Populações em risco      
Fator de risco           
Fatores de risco         
*/