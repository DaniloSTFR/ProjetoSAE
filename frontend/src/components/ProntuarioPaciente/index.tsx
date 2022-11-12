import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE_URL } from 'utils/resquests';
import { SaeNicNocTypes } from 'types/Diagnosticos';
import './styles.scss';

type Props = {
    uuidDiagArray: string[],
}
/* type KeyWordElements ={
    uuid:string; 
    idItem:number; 
    keyword:string;
} */

type SaeNicNocTypesArr = {
    arr: [SaeNicNocTypes]
}

//const Diagnosticos = ({ onChecked, nInteno = "" }: Props) => {
const ProntuarioPaciente = ({ uuidDiagArray }: Props) => {

    const [saeNicNocTypesArr, setSaeNicNocTypesArr] = useState<SaeNicNocTypesArr>({
        arr: [{
            uuid_diagnosticos: "",
            codigo_do_diagnostico: "",
            intervercoes_nic: [""],
            resultados_noc: [""]
        }]
    });

    useEffect(() => {
        axios.post(`${BASE_URL}/analisediagnostico`, { uuidDiagArray })
            .then(response => {
                //const data = response.data as CategoriasItensTypes[];
                const dados = response.data.respostasNICNOC as [SaeNicNocTypes];
                setSaeNicNocTypesArr({ arr: dados });
            })
            .finally(() => console.log('Fim do Post Analise de dados dentro do Resultados e Intervenções'))


    }, [uuidDiagArray]);

    useEffect(() => {
        console.log(saeNicNocTypesArr);
    }, [saeNicNocTypesArr]);

    //Scroll to top
    useEffect(() => {
        toTop()
    }, []);

    function toTop() {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    return (
        <>
            
                <div>
                    <h5>Dados do paciente</h5>
                </div>
                <div className="card">
                    <div className="card-header dadospaciente">
                        <ul>
                            <li>Atendimento:<strong> 3445900</strong></li>
                            <li>Nome:<strong> Will Smith Line</strong></li>
                            <li>Sexo:<strong> Masculino  </strong></li>
                            <li>Nascimento:<strong> 05/05/1965  </strong></li>
                            <li>Idade:<strong> 56a 10m 24d</strong></li>
                        </ul>
                    </div>
                </div>
                
                <hr />

                <div>
                    <h5>Sinais Vitais</h5>
                </div>
                <div className="card">
                    <div className="card-header">
                        <form className="row g-3 ">
                            <div className="col-6 inputWidth">
                                <label htmlFor="inputAltura" className="form-label">Altura(m):</label>
                                <input type="text" className="form-control" id="inputAltura" disabled={true}
                                    value={1.70}
                                />
                            </div>
                            <div className="col-6 inputWidth">
                                <label htmlFor="inputPeso" className="form-label">Peso(kg):</label>
                                <input type="text" className="form-control" id="inputPeso" disabled={true}
                                    value={90}
                                />
                            </div>
                            <div className="col-6 inputWidth">
                                <label htmlFor="inputIMC" className="form-label">IMC:</label>
                                <input type="text" className="form-control" id="inputIMC" disabled={true}
                                    value={"valIMC"}
                                />
                            </div>

                            <div className="col-6 inputWidth">
                                <label htmlFor="inputGlicemia" className="form-label">Glicemia:</label>
                                <input type="text" className="form-control" id="inputGlicemia" disabled={true}
                                    value={100}
                                />
                            </div>
                            <div className="col-6 inputWidth">
                                <label htmlFor="inputPressaoArterial" className="form-label">Pressão arterial:</label>
                                <input type= "text" className="form-control" id="inputPressaoArterial" disabled = {true}
                                    placeholder="__/__"
                                    value = {"10/08"}
                                />
                            </div>
                            <div className="col-6 inputWidth">
                                <label htmlFor="inputOximetria" className="form-label">Oxímetria:</label>
                                <input type="text" className="form-control" id="inputOximetria" disabled = {true}
                                    value = {1010}
                                />
                            </div>

                        </form>
                    </div>
                </div>
                                
                <hr />

                <div>
                    <h5>Diagnósticos de enfermagem:</h5>
                </div>
                <div><strong>00231 - RISCO DE SÍNDROME DO IDOSO FRÁGIL</strong></div>
                <div className="card">
                    <div className="card-header dadospaciente">
                        <h5>INTERVENÇÕES DE ENFERMAGEM - NIC</h5>
                        <ul>
                            <li>(7140) Apoio Familiar</li>
                            <li>(1800) Assistência no Autocuidado</li>
                            <li>(0201) Promoção do Exercício: Treino para Fortalecimento</li>
                        </ul>
                        <br/>
                        <h5>RESULTADOS - NOC</h5>
                        <ul>
                            <li>Apoio Social</li>
                            <li>Bem-estar Familiar</li>
                            <li>Envolvimento Social</li>
                            <li>Habilidades de Interação Social</li>
                            <li>Integridade Familiar</li>
                        </ul>
                    </div>
                </div>
                <br/>
                <div><strong>00231 - ISOLAMENTO SOCIAL</strong></div>
                <div className="card">
                    <div className="card-header dadospaciente">
                        <h5>INTERVENÇÕES DE ENFERMAGEM - NIC</h5>
                        <ul>
                            <li>(7140) Apoio Familiar</li>
                            <li>(1800) Assistência no Autocuidado</li>
                            <li>(0201) Promoção do Exercício: Treino para Fortalecimento</li>
                        </ul>
                        <br/>
                        <h5>RESULTADOS - NOC</h5>
                        <ul>
                            <li>Apoio Social</li>
                            <li>Bem-estar Familiar</li>
                            <li>Envolvimento Social</li>
                            <li>Habilidades de Interação Social</li>
                            <li>Integridade Familiar</li>
                        </ul>
                    </div>
                </div>
                
                <hr />
                <br />

                <div>
                    <h5>Comentários e Observações:</h5>
                </div>
                <div className="card">
                    <div className="card-header dadospaciente">
                        <p><strong>@_user</strong> (Nome_Completo)</p>
                        <p>Aplicação de pressão firme e contínua em pontos 
                            especiais do corpo para reduzir a dor, produzir 
                       relaxamento e prevenir ou reduzir a náusea. |</p>
                    </div>
                </div>

                <hr />

                <div>
                    <label><h5>Anotações de enfermagem:</h5></label>
                </div>
                <div className="card">
                    <div className="card-body">
                            <textarea className="textareaanotacao" id="exampleFormControlTextarea1" rows={5} 
                            style={{ marginTop: '0px', marginBottom: '0px', height: '214px' }} />
                    </div>
                </div>
                <div className="row">
                        <div className="col-auto">
                            <button type="button" className="btn btn-primary">Enviar</button>
                        </div>
                    </div>
                <hr />
                <div>
                    <button type="button" className="btn btn-outline-success btn-lg">Imprimir diagnóstico</button>
                    <br /><br />
                </div>

        </>
    );

}

export default ProntuarioPaciente;

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