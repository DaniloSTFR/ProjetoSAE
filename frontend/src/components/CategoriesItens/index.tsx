import { useEffect, useState } from 'react';
import { Showcategoriasitens } from 'types/Categorias';
import { Usuario } from 'types/Usuario';
import api from 'services/api';

type Props = {
    checkFunction: Function;
    onChecked: Function;
    nInteno: string;

    usuarioContext: Usuario | undefined;
    historyRouter: any;
}


const CategoriesItens = ({ checkFunction, onChecked, nInteno = "", usuarioContext,historyRouter }: Props) => {

    const [varCategoriasItensTypes, setVarCategoriasItensTypes] = useState<Showcategoriasitens>({
        codCategoriasItensUuId: "",
        descricaoCategoriasItens: "",
        nomeInternoCategoriasItens: "",
        ordemCategoriaItens: 0,
        saeItensformularios: []
    });


    useEffect(() => {
        async function loadItens() {
            console.log(usuarioContext);
            //const response = await api.post('/find/categoriasitensbynome', { nomeInternoCategoriasItens: nInteno });
            const pramsRequest = {nomeInternoCategoriasItens: nInteno };
            const response = await api.post(`/find/categoriasitensbynome`, pramsRequest);
/*             const response = await request.post(`${BASE_URL}/find/categoriasitensbynome`, pramsRequest,
            {
                headers: {
                    'Authorization': `token ${usuarioContext?.token}`
                }
            }); */
            const dados = response.data as Showcategoriasitens[];
            setVarCategoriasItensTypes(dados[0]);
        }
        loadItens();
        // eslint-disable-next-line
      }, [nInteno]);


    useEffect(() => {
        //console.log(varCategoriasItensTypes);
    }, [varCategoriasItensTypes]);

    function radioOption(txtOP: string, valueOP: string, nameOP: string, uuid_in:string,idItem_in:number) {
        return (

            <label style={{ margin: '0 .4rem 0 0' }}>
                <input
                    type="radio"
                    value={`"${valueOP}"`}

                    name={nameOP}
                    onChange={() => onChecked(uuid_in,idItem_in,valueOP)}
                    checked = {checkFunction (`${valueOP}`)? true: false }
                    style={{ margin: '.4rem' }}
                />
                {txtOP}
            </label>

        );
    }


    function selectOption(txtOP: string, valueOP: string, nameOP: string, uuid_in:string,idItem_in:number) {
        return (

            <label style={{ margin: '0 .4rem 0 0' }}>
                <input
                    type="checkbox"
                    value={`"${valueOP}"`}

                    name={nameOP}
                    onChange={() => onChecked(uuid_in+idItem_in,idItem_in,valueOP)}
                    /* checked = {checkFunction (`${valueOP}`)? true: false } */
                    style={{ margin: '.4rem' }}
                />
                {txtOP}
            </label>

        );
    }

    // {varCategoriasItensTypes.saeItensformularios[0].opcoesItensFormJson[0].valores.map(( it, index ) =>
    return (
        <>
            <div>
                <h4>{varCategoriasItensTypes.ordemCategoriaItens + " - " + varCategoriasItensTypes.descricaoCategoriasItens}</h4>

                {varCategoriasItensTypes.saeItensformularios.length > 0 ? (

                    <div className="question">
                        {varCategoriasItensTypes.saeItensformularios.map((sif, indexSIF) =>
                            <div key={indexSIF}>

                                <h5> {sif.descricaoItem} </h5>
                                {sif.opcoesItensFormJson.tipo === "multipla"? 

                                        <div className="checkbox">
                                            <ul className= "inlineList multipla">

                                                {sif.opcoesItensFormJson.valores?.map((it, indexVl) =>
                                                    <li key={indexVl}>
                                                        {selectOption(it.descricao, it.chave,
                                                            varCategoriasItensTypes.nomeInternoCategoriasItens + '-' +
                                                            sif.ordemItem,
                                                            sif.codCategoriasItensUuId,
                                                            sif.codItensFormularios)}
                                                    </li>
                                                )}

                                            </ul>
                                        </div>

                                   :
                                        <div className="radio">
                                            <ul className= "inlineList" >
                                                {sif.opcoesItensFormJson.valores?.map((it, indexVl) =>
                                                    <li key={indexVl}>
                                                        {radioOption(it.descricao, it.chave,
                                                            varCategoriasItensTypes.nomeInternoCategoriasItens + '-' +
                                                            sif.ordemItem,
                                                            sif.codCategoriasItensUuId,
                                                            sif.codItensFormularios)}
                                                    </li>
                                                )}
                                            </ul>
                                        </div> 
                                 }



                                <br />
                            </div>
                        )}
                    </div>

                ) : ""}

                <hr />
            </div>

        </>
    );

}

export default CategoriesItens;