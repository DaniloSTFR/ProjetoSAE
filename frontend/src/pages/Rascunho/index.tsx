
import HistoricoTable from "components/HistoricoTable";

const Rascunho = () => {


    return (
        <>
                <div className="card">
                    <div className="card-header">
                        <form className="row g-3 ">
                            <div className="col-6 inputWidth">
                                <label htmlFor="inputAltura" className="form-label">Nome do Paciente(m):</label>
                                <input type="text" className="form-control" id="inputAltura" disabled={true}
                                    value={"José Jesus"}
                                />
                            </div>
                            <div className="col-6 inputWidth">
                                <label htmlFor="inputPeso" className="form-label">Data Nascimento</label>
                                <input type="text" className="form-control" id="inputPeso" disabled={true}
                                    value={"10/11/1982"}
                                />
                            </div>
                        </form>
                    </div>
                </div>
          <div><HistoricoTable/></div>
        </>

    );
}

export default Rascunho;