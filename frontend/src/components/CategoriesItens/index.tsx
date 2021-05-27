import axios from 'axios';
import { useEffect, useState } from 'react';
import { Showcategoriasitens } from 'types/Categorias';
import { BASE_URL } from 'utils/resquests';

type Props = {
    onChecked: Function;
    nInteno: string;
}


const CategoriesItens = ({ onChecked, nInteno = "" }: Props) => {

    const [varCategoriasItensTypes, setVarCategoriasItensTypes] = useState<Showcategoriasitens>({
        codCategoriasItensUuId: "",
        descricaoCategoriasItens: "",
        nomeInternoCategoriasItens: "",
        ordemCategoriaItens: 0,
        saeItensformularios: []
    });




    useEffect(() => {
        axios.post(`${BASE_URL}/showcategoriasitens`, { nomeInternoCategoriasItens: nInteno })
            .then(response => {
                //const data = response.data as CategoriasItensTypes[];
                const dados = response.data as Showcategoriasitens[];
                setVarCategoriasItensTypes(dados[0]);
            })
            .finally(            );
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
                    //checked={state === "Male"}
                    onChange={() => onChecked(uuid_in,idItem_in,valueOP)}
                    style={{ margin: '.4rem' }}
                />
                {txtOP}
            </label>

        );
    }

    // {varCategoriasItensTypes.saeItensformularios[0].opcoesItensFormJson[0].valores.map(( it, index ) =>
    return (
        <>
            <p>{nInteno}</p>
            <div>
                <h4>{varCategoriasItensTypes.ordemCategoriaItens + " - " + varCategoriasItensTypes.descricaoCategoriasItens}</h4>

                {varCategoriasItensTypes.saeItensformularios.length > 0 ? (

                    <div className="question">
                        {varCategoriasItensTypes.saeItensformularios.map((sif, indexSIF) =>
                            <div key={indexSIF}>

                                <h5> {sif.descricaoItem} </h5>

                                <div className="radio">
                                    <ul className="inlineList" >

                                        {sif.opcoesItensFormJson.valores.map((it, indexVl) =>
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