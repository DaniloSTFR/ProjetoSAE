import axios from 'axios';
import CategoriesItens from 'components/CategoriesItens';
import { CategoriasItensTypes } from 'types/Categorias';
import { useEffect, useState } from 'react';
import { BASE_URL } from 'utils/resquests';
import ReactDOM from 'react-dom'
import Diagnosticos from 'components/Diagnosticos';


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
    const myArray = ["Historico_de_Enfermagem","Historia_Doenca_Atual","Historia_Pregressa","Exame_Fisico","Necessidades_Psicossociais_Habitos_de_Vida","Necessidades_Psicobiologias_Cuidado_Corporal","Necessidades_Psicobiologias_Nutricao_e_Hidratacao","Necessidades_Psicobiologias_Eliminacao_Urinaria","Necessidades_Psicobiologias_Eliminacao_intestinal","Sexualidade","Moradia"];
    const [load,setLoad] = useState(false); 
    const [active, setActive] = useState(false);
    // eslint-disable-next-line 
    const [state, setState] = useState("");
    const [categoriesJSON, setCategoriesJSON] = useState(myArray);
    const [nomeCategorias, setNomeCategorias] = useState<NomeCategorias>({ nomeInteno: categoriesJSON, uuid: [] });
    const [listaKeyWordElements, setlistaKeyWordElements] = useState<KeyWordElementsArray>({ arr: [] });

    



    useEffect(() => {
        axios.get(`${BASE_URL}/categoriasitens`)
            .then(response => {
                const data = response.data as CategoriasItensTypes[];
                const nmInteno = data.map(x => x.nomeInternoCategoriasItens);
                const uuidItem = data.map(x => x.codCategoriasItensUuId);
                setNomeCategorias({ nomeInteno: nmInteno, uuid: uuidItem });

                
                //setCategoriesJSON(nmInteno);
            }
            );
            ReactDOM.render (<h3>React</h3>, document.getElementById('rectTeste'));    
    }, []); 

    useEffect(() => {
        ReactDOM.render (

            <form //onSubmit={loadPage}
            >   
                {nomeCategorias.nomeInteno.map(( dev, index ) =>

                <div key={index}> 
                    {// eslint-disable-next-line
                    }
                    <CategoriesItens onChecked={onChangeItemSimples} nInteno={dev} />
                </div>
                )}        
                <div>   
                    {// eslint-disable-next-line
                    }                
                    <button type="button" onClick={handleDadosAnalise} className="btn btn-outline-primary btn-lg">Analisar dados</button>
                </div>

                <br />

            </form> 
            
            , document.getElementById('rectTeste'));
    },[nomeCategorias]); 


    const onChangeItemSimples = (uuid_in:string, idItem_in:number, keyword_in: string) => {
        setState(keyword_in);
        //console.log(categories);
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
        //console.log(listaKeyWordElements);
    },[listaKeyWordElements]); 
    
        // eslint-disable-next-line
    function loadPage (e: any) {
        e.preventDefault();
        setLoad(true);
        setActive(true);
        setCategoriesJSON(myArray);
        console.log(load);
        console.log(active);
        
        
    }

    async function handleDadosAnalise(){

        const enviar = listaKeyWordElements.arr;
        ReactDOM.render (<Diagnosticos keyWordElementsArray={enviar} />, document.getElementById('diagnosticos'));
      };
    
    return (
        <>
            <div id="rectTeste"></div>

            <div id="formulario"></div>

            <div id="diagnosticos"></div>
        </>
    );
}

export default Questoes;



/*


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