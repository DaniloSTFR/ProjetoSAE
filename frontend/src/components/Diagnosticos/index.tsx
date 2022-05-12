import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE_URL } from 'utils/resquests';
import { DiagnosticosItensTypes } from 'types/Diagnosticos';

type Props = {
    keyWordElementsArray: KeyWordElements[];
    onClickedNicNoc: Function;
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
const Diagnosticos = ({ keyWordElementsArray,onClickedNicNoc }: Props) => {   

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
/*
    txt = txt.replace("Definição",                   '+ definicao : ')------------
    txt = txt.replace("Características definidoras", '+ "caracteristicas_definidoras" : ')--------
    txt = txt.replace("Código do diagnóstico",       '+ "codigo_do_diagnostico" : ')----------------
    txt = txt.replace("Condições associadas",        '+ "condicoes_associadas" : ')-----------------
    txt = txt.replace("Fatores relacionados",        '+ "fatores_relacionados" : ')-------------------
    txt = txt.replace("Populações em risco",         '+ "populacao_em_risco" : ')
    txt = txt.replace("Fatores de risco",            '+ "fatores_de_risco" : ')---------------------
*/


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

                                    <p className="card-text">Características definidoras:</p>
                                        <ul>
                                            {itens.caracteristicas_definidoras.map(( itkey, idx ) => 
                                                <li key={idx}>
                                                    {itkey}
                                                </li>
                                            )}
                                            {itens.caracteristicas_definidoras.length<1?  "Nenhuma": "" }
                                        </ul>

                                    <p className="card-text">Condições associadas:</p>
                                        <ul>
                                            {itens.condicoes_associadas?.map(( itkey, idx ) => 
                                                <li key={idx}>
                                                    {itkey}
                                                </li>
                                            )}
                                            {itens.condicoes_associadas.length<1?  "Nenhuma": "" }
                                        </ul>
                                                        

                                    <p className="card-text">Fatores relacionados:</p>
                                        <ul>
                                            {itens.fatores_relacionados?.map(( itkey, idx ) => 
                                                <li key={idx}>
                                                    {itkey}
                                                </li>
                                            )}
                                            {itens.fatores_relacionados.length<1?  "Nenhum": "" }
                                        </ul>

                                    <p className="card-text">Fatores de risco:</p>
                                        <ul>
                                            {itens.fatores_de_risco?.map(( itkey, idx ) => 
                                                <li key={idx}>
                                                    {itkey}
                                                </li>
                                            )}
                                            {itens.fatores_de_risco.length<1?  "Nenhum": "" }
                                        </ul>    
                                    <p className="card-text">Populações em risco:</p>
                                        <ul>
                                            {itens.populacao_em_risco?.map(( itkey, idx ) => 
                                                <li key={idx}>
                                                    {itkey}
                                                </li>
                                            )}
                                            {itens.populacao_em_risco.length<1?  "Nenhuma": "" }
                                        </ul>                


                                    {/* <a href="#diagnosticos" className="btn btn-primary">Diagnóstico mais adequado</a>  */}
                                    <button type="button" onClick={() => onClickedNicNoc(itens._id)} className="btn btn-outline-primary btn-lg">Diagnóstico mais adequado</button>          
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