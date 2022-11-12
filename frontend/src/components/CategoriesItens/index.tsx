import './styles.scss';

import { useEffect, useState } from 'react';
import { Showcategoriasitens } from 'types/Categorias';
import { Usuario } from 'types/Usuario';
import api from 'services/api';

type Props = {
    checkFunction: Function;
    onCheckedSimples: Function;
    onCheckedMulti: Function;
    nInteno: string;

    usuarioContext: Usuario | undefined;
    historyRouter: any;
}


const CategoriesItens = ({ checkFunction, onCheckedSimples,onCheckedMulti, nInteno = "", usuarioContext,historyRouter }: Props) => {

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
            const apiContext = await api();
            const response = await apiContext.post(`/find/categoriasitensbynome`, pramsRequest);
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

           <>
                <input
                    type="radio"
                    value={`${valueOP}`}
                    id={`${valueOP}`}
                    name={nameOP}
                    onChange={() => onCheckedSimples(uuid_in,idItem_in,valueOP)}
                    checked = {checkFunction (`${valueOP}`)? true: false }
                    style={{ margin: '.4rem' }}
                    className="btn-check form-check-input"
                ></input>

                <label htmlFor={`${valueOP}`} className="mb-2 btn btn-outline-success iten-size bi bi-check">{txtOP}
                </label>
           </>

        );
    }


    function selectOption(txtOP: string, valueOP: string, nameOP: string, uuid_in:string,idItem_in:number) {
        return (
            <>
            <div className="input-group-text">
                    <input
                        type="checkbox"
                        value={`${valueOP}`}
                        id={`${valueOP}`}
                        name={nameOP}
                        onChange={() => onCheckedMulti(uuid_in+idItem_in,idItem_in,valueOP)}
                        /* checked = {checkFunction (`${valueOP}`)? true: false } */
        
                        className="selectItem form-check-input btn-outline-primary"
                        ></input>
                    
                    <label htmlFor={`${valueOP}`} className="iten-size bi bi-check">{txtOP}
                </label>
                    
                </div>         
            </>

        );
    }

    // {varCategoriasItensTypes.saeItensformularios[0].opcoesItensFormJson[0].valores.map(( it, index ) =>
    return (
        <>
            <div>
                <h5 className='h5subTitle'>{varCategoriasItensTypes.ordemCategoriaItens + " - " + varCategoriasItensTypes.descricaoCategoriasItens}</h5>

                {varCategoriasItensTypes.saeItensformularios.length > 0 ? (

                    <div className="question">
                        {varCategoriasItensTypes.saeItensformularios.map((sif, indexSIF) =>
                            <div key={indexSIF}>

                                <h5>{varCategoriasItensTypes.ordemCategoriaItens+"."+(indexSIF+1)+ " - " + sif.descricaoItem} </h5>
                                {sif.opcoesItensFormJson.tipo === "multipla" ?

                                    <div className="checkbox">
                                        <ul className="inlineList multipla">

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
                                        <ul className="inlineList" >
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
       
            </div>

        </>
    );

}

export default CategoriesItens;