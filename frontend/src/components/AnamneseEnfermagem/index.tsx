import './styles.scss';
import CategoriesItens from 'components/CategoriesItens';
import Diagnosticos from 'components/Diagnosticos';
import Pagination from 'components/Pagination';
import ProntuarioPaciente from 'components/ProntuarioPaciente';
import BarraProgressao from 'components/BarraProgressao';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import api from 'services/api';
import { CategoriasItensTypes } from 'types/Categorias';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

import { Usuario } from 'types/Usuario';
import { DiagnosticosItensTypes } from 'types/Diagnosticos';


type NomeCategorias = {
    nomeInteno: string[];
    uuid: string[];
}


type KeyWordElements = {
    uuid: string;
    idItem: number;
    keyword: string;
}

type KeyWordElementsArray = {
    arr: KeyWordElements[];
}

type DiagnosticosItensTypesArr ={
    arr: DiagnosticosItensTypes[]
}

type Props = {
    usuarioContext: Usuario | undefined;
    historyRouter: any;
    numeroprontuario: number
    setTitle: Function;
}


const AnamneseEnfermagem = ({ usuarioContext, historyRouter, numeroprontuario, setTitle }: Props) => {
    const myArray = ["Historico_de_Enfermagem", "Historia_Doenca_Atual", "Historia_Pregressa", "Exame_Fisico", "Necessidades_Psicossociais_Habitos_de_Vida", "Necessidades_Psicobiologias_Cuidado_Corporal", "Necessidades_Psicobiologias_Nutricao_e_Hidratacao", "Necessidades_Psicobiologias_Eliminacao_Urinaria", "Necessidades_Psicobiologias_Eliminacao_intestinal", "Sexualidade", "Moradia", "Instrumentos"];

    const [state, setState] = useState(0);
    // eslint-disable-next-line
    const [categoriesJSON, setCategoriesJSON] = useState(myArray);
    const [nomeCategorias, setNomeCategorias] = useState<NomeCategorias>({ nomeInteno: categoriesJSON, uuid: [] });
    const [listaKeyWordElements, setlistaKeyWordElements] = useState<KeyWordElementsArray>({ arr: [] });
    const [open, setOpen] = useState('Questoes');
    const [diagnosticosSelectId, setDiagnosticosSelectId] = useState<DiagnosticosItensTypesArr>({arr: []});  




    useEffect(() => {
        async function loadCategoriasitens() {
            const apiContext = await api();
            const response = await apiContext.get('/showall/categoriasitens');

            const data = response.data as CategoriasItensTypes[];
            const nmInteno = data.map(x => x.nomeInternoCategoriasItens);
            const uuidItem = data.map(x => x.codCategoriasItensUuId);
            setNomeCategorias({ nomeInteno: nmInteno, uuid: uuidItem });
        }
        loadCategoriasitens();
    }, []);

    const keywordExists = (keyword_in: string) => {
        const arraypereciveis = listaKeyWordElements.arr.filter(f => f.keyword === keyword_in);
        return (arraypereciveis.length > 0);
    };

    const onChangeItemSimples = (uuid_in: string, idItem_in: number, keyword_in: string) => {
        console.log("keywordSimples:" + keyword_in);

        let listaUP: KeyWordElementsArray = {
            arr: listaKeyWordElements.arr
        };

        if (listaUP.arr.length === 0) {
            listaUP.arr.push(
                {
                    uuid: uuid_in,
                    idItem: idItem_in,
                    keyword: keyword_in
                });

        } else {

            let idx: number = listaUP.arr.findIndex(x => (x.uuid === uuid_in && x.idItem === idItem_in));

            if (idx + 1) {
                listaUP.arr[idx].uuid = uuid_in;
                listaUP.arr[idx].idItem = idItem_in;
                listaUP.arr[idx].keyword = keyword_in;

            } else {
                listaUP.arr.push(
                    {
                        uuid: uuid_in,
                        idItem: idItem_in,
                        keyword: keyword_in
                    });
            }
        }
        setlistaKeyWordElements({ arr: listaUP.arr })
    }

    const onChangeItemMulti = (uuid_in: string, idItem_in: number, keyword_in: string) => {
        console.log("keywordMulti:" + keyword_in);
        let listaUP: KeyWordElementsArray = {
            arr: listaKeyWordElements.arr
        };
        if (listaUP.arr.length === 0) {
            listaUP.arr.push(
                {
                    uuid: uuid_in,
                    idItem: idItem_in,
                    keyword: keyword_in
                });

        } else {
            let idx: number = listaUP.arr.findIndex(x => (x.uuid === uuid_in && x.idItem === idItem_in && x.keyword === keyword_in));
            if (idx + 1) {
                listaUP.arr.splice(idx, 1);
            } else {
                listaUP.arr.push(
                    {
                        uuid: uuid_in,
                        idItem: idItem_in,
                        keyword: keyword_in
                    });
            }
        }
        setlistaKeyWordElements({ arr: listaUP.arr })
    }

    const onSelectDiagnosticoItem = (selectDiagnostico: DiagnosticosItensTypes) => {
        console.log("selectDiagnosticoId:" + selectDiagnostico._id);

        let selectDiagnosticoUP: DiagnosticosItensTypesArr = {
            arr: diagnosticosSelectId.arr
        };
        
        if (selectDiagnosticoUP.arr.length === 0) {
            selectDiagnosticoUP.arr.push(selectDiagnostico);

        } else {
            let idx: number = selectDiagnosticoUP.arr.findIndex(x => (x._id === selectDiagnostico._id && x.codigo_do_diagnostico === selectDiagnostico.codigo_do_diagnostico ));
            if (idx + 1) {
                selectDiagnosticoUP.arr.splice(idx, 1);
            } else {
                selectDiagnosticoUP.arr.push(selectDiagnostico);
            }
        }
        setDiagnosticosSelectId({ arr: selectDiagnosticoUP.arr })
    }

    useEffect(() => {
        console.log(listaKeyWordElements.arr);
    }, [listaKeyWordElements]);

    useEffect(() => {
        console.log(diagnosticosSelectId.arr);
    }, [diagnosticosSelectId]);


    const loadPage = (idx: number) => {
        setState(idx);
    }


    async function onClickedProntuarioPaciente(uuid_Diagnosticos: string) {
        if(diagnosticosSelectId.arr.length>0){
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
            setTitle('Prontuário');
            setOpen('Prontuario');
            const uuidArray = [uuid_Diagnosticos];
            ReactDOM.render(<ProntuarioPaciente uuidDiagArray={uuidArray} />, document.getElementById('prontuario_paciente'));
        }
    };

    async function handleDadosAnalise() {
        setTitle('Diagnósticos');
        if(listaKeyWordElements.arr.length>0){
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
            setOpen('Diagnosticos');
            const enviar = listaKeyWordElements.arr;
            ReactDOM.render(<Diagnosticos keyWordElementsArray={enviar} onClickedProntuarioPaciente={onClickedProntuarioPaciente} selectDiagnostico={onSelectDiagnosticoItem} numeroprontuario={numeroprontuario} usuarioContext={usuarioContext}/>, document.getElementById('diagnosticos'));
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        }
    };


    return (
        <>
            <div className="container">
                <Collapse in={open === 'Questoes'}>
                    <div>
                        <BarraProgressao paginaAtual={state} tamanhaDasPaginas={nomeCategorias.nomeInteno.length} />
                    </div>
                </Collapse>

                <Collapse in={open === 'Diagnosticos' || open === 'Prontuario'}>
                    <div>
                        <Button
                            onClick={() => setOpen(open === 'Prontuario' ?'Diagnosticos':'Questoes')}
                            aria-controls="example-collapse-text"
                            aria-expanded={open !== 'Questoes'}
                            variant=" btn btn-primary circleButton"
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                            </svg>
                        </Button>
                    </div>
                </Collapse>

                <div>
                    <Collapse in={open==='Questoes'}>
                        <div id="formulario">
                            <form >
                                <CategoriesItens checkFunction={keywordExists} onCheckedSimples={onChangeItemSimples} onCheckedMulti={onChangeItemMulti} nInteno={nomeCategorias.nomeInteno[state]} usuarioContext={usuarioContext} historyRouter={historyRouter} />
                            </form>

                            <Pagination onClicked={loadPage} onClickeAnalise={handleDadosAnalise} paginaAtual={state} tamanhaDasPaginas={nomeCategorias.nomeInteno.length} />
                            <br />
                        </div>
                    </Collapse>
                </div>

                <div>
                    <Collapse in={open === 'Diagnosticos'}>
                        <div>
                            <br />
                            <div id="diagnosticos"></div>
                            <br />
                        </div>
                    </Collapse>
                </div>

                <div>
                    <Collapse in={open === 'Prontuario'}>
                        <div>
                            <br />
                            <div id="prontuario_paciente"></div>
                            <br />
                        </div>
                    </Collapse>
                </div>
            </div>
        </>
    );
}

export default AnamneseEnfermagem;
