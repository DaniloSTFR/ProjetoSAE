import CategoriesItens from 'components/CategoriesItens';
import Diagnosticos from 'components/Diagnosticos';
import IntervercoesResultados from 'components/IntervercoesResultados';
import Pagination from 'components/Pagination';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import api from 'services/api';
import { CategoriasItensTypes } from 'types/Categorias';


type NomeCategorias = {
    nomeInteno: string[];
    uuid: string[];
}


type KeyWordElements ={
    uuid:string; 
    idItem:number; 
    keyword:string;
}

type KeyWordElementsArray ={
    arr: KeyWordElements[];
}


const Questoes = () => {
    const myArray = ["Historico_de_Enfermagem","Historia_Doenca_Atual","Historia_Pregressa","Exame_Fisico","Necessidades_Psicossociais_Habitos_de_Vida","Necessidades_Psicobiologias_Cuidado_Corporal","Necessidades_Psicobiologias_Nutricao_e_Hidratacao","Necessidades_Psicobiologias_Eliminacao_Urinaria","Necessidades_Psicobiologias_Eliminacao_intestinal","Sexualidade","Moradia","Instrumentos"];

    const [state, setState] = useState(0);
    // eslint-disable-next-line
    const [categoriesJSON, setCategoriesJSON] = useState(myArray);
    const [nomeCategorias, setNomeCategorias] = useState<NomeCategorias>({ nomeInteno: categoriesJSON, uuid: [] });
    const [listaKeyWordElements, setlistaKeyWordElements] = useState<KeyWordElementsArray>({ arr: [] });

    

    useEffect(() => {
        async function loadCategoriasitens() {
          const response = await api.get('/categoriasitens');
            const data = response.data as CategoriasItensTypes[];
            const nmInteno = data.map(x => x.nomeInternoCategoriasItens);
            const uuidItem = data.map(x => x.codCategoriasItensUuId);
            setNomeCategorias({ nomeInteno: nmInteno, uuid: uuidItem });
        }
        loadCategoriasitens();
      }, []);

    const keywordExists = (keyword_in: string) => {
        const arraypereciveis  =   listaKeyWordElements.arr.filter(f => f.keyword === keyword_in);
        return (arraypereciveis.length > 0);
      };

    const onChangeItemSimples = (uuid_in:string, idItem_in:number, keyword_in: string) => {
        console.log("keyword:" + keyword_in);

        let listaUP:KeyWordElementsArray = {
            arr:listaKeyWordElements.arr
        };


        if(listaUP.arr.length === 0 ){
            listaUP.arr.push(
                {
                    uuid:uuid_in, 
                    idItem:idItem_in, 
                    keyword:keyword_in
                });

        }else{

            let idx:number = listaUP.arr.findIndex( x => (x.uuid === uuid_in && x.idItem === idItem_in ));
            
            if(idx+1){
                listaUP.arr[idx].uuid = uuid_in;
                listaUP.arr[idx].idItem = idItem_in;
                listaUP.arr[idx].keyword = keyword_in;

            }else{
                listaUP.arr.push(
                    {
                        uuid:uuid_in, 
                        idItem:idItem_in, 
                        keyword:keyword_in
                    });
            }
        }
        setlistaKeyWordElements({arr:listaUP.arr})
    }

    useEffect(() => {
        console.log(listaKeyWordElements);
    },[listaKeyWordElements]); 
    
        
    const loadPage = (idx :number) => {
       setState(idx);    
    }


    async function onClickedNicNoc(uuid_Diagnosticos: string){

        ReactDOM.render (<div></div>, document.getElementById('formulario'));
        ReactDOM.render (<div></div>, document.getElementById('diagnosticos'));
        
        //const uuidArray = ["60822f3f24a3f414f43be6a1","60822f3f24a3f414f43be698","60822f4724a3f414f43be6ac", "60822f4f24a3f414f43be6c9" ];
        const uuidArray = [uuid_Diagnosticos];
        ReactDOM.render (<IntervercoesResultados uuidDiagArray={uuidArray} />, document.getElementById('intervercoes_resultados'));
      };

    async function handleDadosAnalise(){

        const enviar = listaKeyWordElements.arr;
        ReactDOM.render (<Diagnosticos keyWordElementsArray={enviar} onClickedNicNoc= {onClickedNicNoc} />, document.getElementById('diagnosticos'));
      };

    
    return (
        <>

            <div id="formulario">
                <form >                        
                    <CategoriesItens checkFunction={keywordExists} onChecked={onChangeItemSimples} nInteno={nomeCategorias.nomeInteno[state]} />
                    <br />
                </form>

                <Pagination onClicked={loadPage} paginaAtual={state} tamanhaDasPaginas={nomeCategorias.nomeInteno.length} />

                
                <button type="button" onClick={handleDadosAnalise} className="btn btn-outline-primary btn-lg">Analisar dados</button>
                
                <br />
            </div>            
            <br />
            <div id="diagnosticos"></div>
            <br />
            <br />
            <div id="intervercoes_resultados"></div>
        </>
    );
}

export default Questoes;



/*


                    {nomeCategorias.nomeInteno.map((dev, index) =>

                        <div key={`${index}-${dev}`}>
                            
                            <CategoriesItens onChecked={onChangeItemSimples} nInteno={nomeCategorias.nomeInteno[state]} />
                        </div>
                    )}


    useEffect(() => {
          async function loadCategories() {
            const response = await api.get('/categoriasitens');

            const data = response.data as CategoriasItensTypes[];
            const nmInteno = data.map(x => x.nomeInternoCategoriasItens);
            const uuidItem = data.map(x => x.codCategoriasItensUuId);
            setNomeCategorias({ nomeInteno: nmInteno, uuid: uuidItem });
            //setCategoriesJSON(nmInteno);
            //console.log(nomeCategorias);
          }
          loadCategories();
        }, [load,active]); 

 
    const onChangeItem =  async(event: React.ChangeEvent<HTMLInputElement>) =>{
            console.log(event);
            const target = event.target;
            // eslint-disable-next-line
            const value = target.type === 'change' ? target.checked : target.value;
            const name = target.name;
            const keyword = target.defaultValue
            setKeyword(keyword);
            console.log(name +":"+ keyword);   
        } 

    //<CategoriesItens onChecked={onChangeItemSimples} />

                 {nomeCategorias.nomeInteno.map(( dev, index ) =>

                    <div key={index}> 
                        <CategoriesItens onChecked={onChangeItemSimples} nInteno={dev} />
                    </div>
                    )} 
     
     

 <button type="button" className="btn btn-outline-primary" onClick={event => setNomeCategorias({ nomeInteno: myArray, uuid: [] })} >Load page</button>



<div> 
                        <CategoriesItens onChecked={onChangeItemSimples} nInteno={myArray[0]} />
                    </div>
                    <div> 
                        <CategoriesItens onChecked={onChangeItemSimples} nInteno={myArray[1]} />
                    </div>
                    <div> 
                        <CategoriesItens onChecked={onChangeItemSimples} nInteno={myArray[2]} />
                    </div>
                    <div> 
                        <CategoriesItens onChecked={onChangeItemSimples} nInteno={myArray[3]} />
                    </div>
                    <div> 
                        <CategoriesItens onChecked={onChangeItemSimples} nInteno={myArray[4]} />
                    </div>
                    <div> 
                        <CategoriesItens onChecked={onChangeItemSimples} nInteno={myArray[5]} />
                    </div>
                    <div> 
                        <CategoriesItens onChecked={onChangeItemSimples} nInteno={myArray[6]} />
                    </div>
                    <div> 
                        <CategoriesItens onChecked={onChangeItemSimples} nInteno={myArray[7]} />
                    </div>
                    <div> 
                        <CategoriesItens onChecked={onChangeItemSimples} nInteno={myArray[8]} />
                    </div>
                    <div> 
                        <CategoriesItens onChecked={onChangeItemSimples} nInteno={myArray[9]} />
                    </div>
                    <div> 
                        <CategoriesItens onChecked={onChangeItemSimples} nInteno={myArray[10]} />
                    </div>
*/