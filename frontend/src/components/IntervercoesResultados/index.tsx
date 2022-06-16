import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE_URL } from 'utils/resquests';
import { SaeNicNocTypes } from 'types/Diagnosticos';

type Props = {
    uuidDiagArray:string [],
}
/* type KeyWordElements ={
    uuid:string; 
    idItem:number; 
    keyword:string;
} */

type SaeNicNocTypesArr ={
    arr: [SaeNicNocTypes]
}

//const Diagnosticos = ({ onChecked, nInteno = "" }: Props) => {
const IntervercoesResultados = ({ uuidDiagArray }: Props) => {   

    const [saeNicNocTypesArr, setSaeNicNocTypesArr] = useState<SaeNicNocTypesArr>({
            arr: [{
                uuid_diagnosticos: "",
                codigo_do_diagnostico: "",
                intervercoes_nic: [""],
                resultados_noc : [""]
            }]
            });

    useEffect(() => {
             axios.post(`${BASE_URL}/analisediagnostico`, {uuidDiagArray})
            .then(response => {
                //const data = response.data as CategoriasItensTypes[];
                const dados = response.data.respostasNICNOC as [SaeNicNocTypes];
                setSaeNicNocTypesArr({arr:dados});
            })
            .finally( () => console.log('Fim do Post Analise de dados dentro do Resultados e Intervenções')   )
  
        
    }, [uuidDiagArray]);

    useEffect(() => {
        console.log(saeNicNocTypesArr);
    }, [saeNicNocTypesArr]);


    return (
        <>
            <div>
                <h4>Resultados e Intervenções</h4>
            </div>
            <div>
                {saeNicNocTypesArr.arr.length > 0 ? (
                    <div>
                        {saeNicNocTypesArr.arr.map((itens, index) =>

                            <div key={index}>

                                <div className="card">
                                    <h5 className="card-header">{itens.codigo_do_diagnostico}</h5>
                                    <div className="card-body">
                                        <p className="card-text">Resultados:</p>
                                        <ul>
                                            {itens.resultados_noc.map((itkey, idx) =>
                                                <li key={idx}>
                                                    {itkey}
                                                </li>
                                            )}
                                        </ul>

                                        <p className="card-text">Intervenções:</p>
                                        <ul>
                                            {itens.intervercoes_nic.map((itkey, idx) =>
                                                <li key={idx}>
                                                    {itkey.replace(/[(0-9)]/g, "")}
                                                </li>
                                            )}
                                        </ul>

                                    </div>
                                </div>
                                <br />
                            </div>
                        )}
                    </div>
                ) :

                    <p>Sem Diagnósticos</p>
                }

            </div>

            <div className="container-lg">
                <label>Anotações de enfermagem:

                    <br /><br />
                    <textarea className="textareaanotacao" id="exampleFormControlTextarea1" rows={5} style={{ marginTop: '0px', marginBottom: '0px', height: '314px' }} />
                </label>
            </div>
            <div>
                <button type="button" className="btn btn-outline-success btn-lg">Imprimir diagnóstico</button>
                <br /><br />
            </div>

        </>
    );

}

export default IntervercoesResultados;

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