import api from 'services/api';
import { ConvertDate } from 'utils/ConvertDate';
import { useEffect, useState } from 'react';
import { Usuario } from 'types/Usuario';
import { EnfNumeroProntuario, EnfProntuarioComplete, EnfAnamneseComplete } from 'types/Prontuario';
import './styles.scss';

type Props = {
    numeroprontuario: number;
    usuarioContext: Usuario | undefined;
}

const ProntuarioPaciente = ({ numeroprontuario, usuarioContext}: Props) => {
    const [enfNumeroProntuarioPaciente, setEnfNumeroProntuarioPaciente] = useState<EnfNumeroProntuario>();
    const [enfProntuarioCompletePaciente, setEnfProntuarioCompletePaciente] = useState<EnfProntuarioComplete>();
    const [enfAnamneseCompletePaciente, setEnfAnamneseCompletePaciente] = useState<EnfAnamneseComplete>();
    const convertDate = new ConvertDate();

    useEffect(() => {
        console.log("useEffect");
        async function doAnaliseDeDados() {
            const apiContext = await api();
            const response = await apiContext.post(`/find/prontuariocompletebynumero`, { numeroprontuario});
            const enf_NumeroProntuario = response.data.numeroProntuarioExists as  EnfNumeroProntuario;
            const enf_ProntuarioComplete = response.data.prontuariolCompleteExists as EnfProntuarioComplete;
            const enf_AnamneseComplete = response.data.anamneseCompleteExists as EnfAnamneseComplete;
            //console.log(enf_NumeroProntuario);
            console.log(enf_ProntuarioComplete.enfComentarioprontuarios);
            //console.log(enf_AnamneseComplete);
            setEnfNumeroProntuarioPaciente(enf_NumeroProntuario);
            setEnfProntuarioCompletePaciente(enf_ProntuarioComplete);
            setEnfAnamneseCompletePaciente(enf_AnamneseComplete);
        }

       doAnaliseDeDados();
        
    }, [numeroprontuario]);

    //Scroll to top
    useEffect(() => {
        toTop()
    }, []);

    function toTop() {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    function getListIntervencoes(uuid_diagnosticos:string){
        const listIntervencoes = enfAnamneseCompletePaciente?.intervencoesJson.filter(int => int.uuid_diagnosticos === uuid_diagnosticos);
        if(listIntervencoes){
            return (
                <>
                    <ul>
                    {listIntervencoes[0].intervercoes_nic.map((itens, indexIt) =>
                        <li key={indexIt}>    
                            {itens}
                        </li>
                    )}
                    </ul>
                </>);
        }
        return '';
    }

    function getListResultados(uuid_diagnosticos:string){
        const listResultados = enfAnamneseCompletePaciente?.resultadosJson.filter(int => int.uuid_diagnosticos === uuid_diagnosticos);
        if(listResultados){
            return (
                <>
                    <ul>
                    {listResultados[0].resultados_noc.map((itens, indexResult) =>
                        <li key={indexResult}>    
                            {itens}
                        </li>
                    )}
                    </ul>
                </>);
        }
        return '';
    }

    function getListComentario(){

        const enfComentarioSort = enfProntuarioCompletePaciente?.enfComentarioprontuarios.slice().sort((a, b) => Number(b.dataCriacao) - Number(a.dataCriacao) );
        console.log(enfComentarioSort);

        if(enfComentarioSort){
            return(
                <>
                    {enfComentarioSort.map((itens, indexCmt) =>
                    <div key={indexCmt}>  
                        <div className="card comentario">
                            <div className="card-header dadospaciente">
                                <p><strong>{itens.codUsuarioUu.tagUsuario}</strong> ({itens.codUsuarioUu.nomePessoa})</p>
                                <p>{itens.comentarioProntuario}</p>
                            </div>
                        </div>
                        <hr />
                    </div>
                    )}
                </>
                );
        }
        return '';
    }

    return (
        <>
            
            <div>
                <h5>Dados do paciente</h5>
            </div>
            <div className="card">
                <div className="card-header dadospaciente">
                    <ul>
                        <li>Número Prontuário: <strong>{enfNumeroProntuarioPaciente?.numeroprontuario || ''}</strong></li>
                        <li>Nome:<strong> {enfProntuarioCompletePaciente?.nomePaciente || ''}</strong></li>
                        <li>Sexo:<strong> Masculino  </strong></li>
                        <li>Nascimento:<strong> { convertDate.ConverterData(enfProntuarioCompletePaciente?.dataNascimento.toLocaleString()) || '' }  </strong></li>
                        <li>Idade:<strong> { convertDate.CalcularIdade(enfProntuarioCompletePaciente?.dataNascimento.toLocaleString()) || ''}</strong></li>
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
                                value={enfProntuarioCompletePaciente?.altura}
                            />
                        </div>
                        <div className="col-6 inputWidth">
                            <label htmlFor="inputPeso" className="form-label">Peso(kg):</label>
                            <input type="text" className="form-control" id="inputPeso" disabled={true}
                                value={enfProntuarioCompletePaciente?.peso}
                            />
                        </div>
                        <div className="col-6 inputWidth">
                            <label htmlFor="inputIMC" className="form-label">IMC:</label>
                            <input type="text" className="form-control" id="inputIMC" disabled={true}
                                value={enfProntuarioCompletePaciente?.imc}
                            />
                        </div>

                        <div className="col-6 inputWidth">
                            <label htmlFor="inputGlicemia" className="form-label">Glicemia:</label>
                            <input type="text" className="form-control" id="inputGlicemia" disabled={true}
                                value={enfProntuarioCompletePaciente?.glicemia}
                            />
                        </div>
                        <div className="col-6 inputWidth">
                            <label htmlFor="inputPressaoArterial" className="form-label">Pressão arterial:</label>
                            <input type= "text" className="form-control" id="inputPressaoArterial" disabled = {true}
                                placeholder="__/__"
                                value = {enfProntuarioCompletePaciente?.pressaoArterial}
                            />
                        </div>
                        <div className="col-6 inputWidth">
                            <label htmlFor="inputOximetria" className="form-label">Oxímetria:</label>
                            <input type="text" className="form-control" id="inputOximetria" disabled = {true}
                                value = {enfProntuarioCompletePaciente?.oximetria}
                            />
                        </div>

                    </form>
                </div>
            </div>
                            
            <hr />

            <div>
                <h5>Diagnósticos de enfermagem:</h5>
            </div>

            {enfAnamneseCompletePaciente?.diagnosticosJson.map((itens, indexDiag) =>
                <div key={indexDiag}>
                    <div><strong>{itens.codigo_do_diagnostico.toUpperCase()}</strong></div>
                    <div className="card nandanicnoc"> 
                        <div className="card-header dadospaciente">
                            <h5>INTERVENÇÕES DE ENFERMAGEM - NIC</h5>
                                {getListIntervencoes(itens._id)}
                            <br/>
                            <h5>RESULTADOS DE ENFERMAGEM - NOC</h5>
                                {getListResultados(itens._id)}
                            <br/>
                        </div>
                    </div>
                    <br/>
                </div>

            ) || ''}            
            <hr />
            
            <div>
                <h5>Comentário e Observação</h5>
            </div>
            <br />
                {getListComentario()}
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