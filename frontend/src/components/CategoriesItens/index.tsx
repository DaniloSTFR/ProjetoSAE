import { useEffect, useState } from 'react';
import api from 'services/api';
import { Showcategoriasitens } from 'types/Categorias';

type Props = {
    checkFunction: Function;
    onChecked: Function;
    nInteno: string;
}


const CategoriesItens = ({ checkFunction, onChecked, nInteno = "" }: Props) => {

    const [varCategoriasItensTypes, setVarCategoriasItensTypes] = useState<Showcategoriasitens>({
        codCategoriasItensUuId: "",
        descricaoCategoriasItens: "",
        nomeInternoCategoriasItens: "",
        ordemCategoriaItens: 0,
        saeItensformularios: []
    });


    useEffect(() => {
        async function loadItens() {
            const response = await api.post('/showcategoriasitens', { nomeInternoCategoriasItens: nInteno });
            const dados = response.data as Showcategoriasitens[];
            setVarCategoriasItensTypes(dados[0]);
        }
        loadItens();
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