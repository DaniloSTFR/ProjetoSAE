import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE_URL } from 'utils/resquests';
import { DiagnosticosItensTypes } from 'types/Diagnosticos';

type Props = {
    keyWordElementsArray: KeyWordElements[];
}
type KeyWordElements ={
    uuid:string; 
    idItem:number; 
    keyword:string;
}

type DiagnosticosItensTypesArr ={
    arr: [DiagnosticosItensTypes]
}

//const Diagnosticos = ({ onChecked, nInteno = "" }: Props) => {
const Diagnosticos = ({ keyWordElementsArray }: Props) => {   

    const [diagnosticosItensTypesArr, setDiagnosticosItensTypesArr] = useState<DiagnosticosItensTypesArr>({
            arr: [{
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

    useEffect(() => {
             axios.post(`${BASE_URL}/analisededados`, {keyWordArrayRequest: keyWordElementsArray})
            .then(response => {
                //const data = response.data as CategoriasItensTypes[];
                const dados = response.data.respostaDagnostico as [DiagnosticosItensTypes];
                setDiagnosticosItensTypesArr({arr:dados});
            })
            .finally( () => console.log('Fim do Post Analise de daddos dentro do Diagnosticos:')   )
  
        
    }, [keyWordElementsArray]);

    useEffect(() => {
        console.log(diagnosticosItensTypesArr);
    }, [diagnosticosItensTypesArr]);

    //console.log(keyWordElementsArray);
    // {varCategoriasItensTypes.saeItensformularios[0].opcoesItensFormJson[0].valores.map(( it, index ) =>
    return (
        <>
            <div>
                <h4>Diagnósticos</h4>
            </div>
            <div>
                {diagnosticosItensTypesArr.arr.length > 0 ? (
                    <div>
                        {diagnosticosItensTypesArr.arr.map(( itens, index ) =>
                            
                            <div key={index}>

                                <div className="card">
                                <h5 className="card-header">{itens.codigo_do_diagnostico}</h5>
                                <div className="card-body">
                                    <h6 className="card-title">Definição: {itens.definicao}</h6>
                                    <p className="card-text">Condições associadas:</p>
                                        <ul>
                                            {itens.condicoes_associadas.map(( itkey, idx ) => 
                                                <li key={idx}>
                                                    {itkey}
                                                </li>
                                            )}
                                        </ul>
                                    
                                    <a href="#diagnosticos" className="btn btn-primary">Diagnóstico mais adequado</a>
                                </div>
                                </div>
                                <br />
                            </div>   
                        )}    
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