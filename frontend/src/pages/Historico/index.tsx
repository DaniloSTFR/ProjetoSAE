
import HistoricoTable from "components/HistoricoTable";
import { useState } from 'react';

import './styles.scss';

const Historico = () => {

    const [porNascimento, setPorNascimento] = useState(true);


    return (
        <>
            <div><h5>Filtrar por:</h5></div>
            <div className="col-md-8">
                <div className="historicotable">
                    <form className="">

                        <div className="col-6 inputWidth">
                            <label htmlFor="nomePaciente" className="form-label">Nome do Paciente:</label>
                            <input type="text" className="form-control" id="nomePaciente" disabled={false}
                                value={"José Jesus"}
                            />
                        </div>
                        <br />
                        <div className="col-6 inputWidth">
                            <h5 >Por date de Nascimento
                                <input
                                    type="checkbox"
                                    onChange={() => setPorNascimento(!porNascimento)}
                                    /* checked = {checkFunction (`${valueOP}`)? true: false } */

                                    className="selectOption form-check-input "
                                />
                            </h5>
                            <label htmlFor="dataNascimento" className="form-label">Data Nascimento</label>
                            <input type="text" className="form-control" id="dataNascimento" disabled={porNascimento}
                                value={"10/11/1982"}
                            />
                        </div>
                        <div className="col-6 inputWidth">
                            <br />
                            <button type="button" className="btn btn-outline-success btn-lg">Pesquisar</button>
                            <br />
                        </div>
                    </form>
                </div>
            </div>

            <br />
            <div><HistoricoTable /></div>
        </>

    );
}

export default Historico;