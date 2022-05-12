type Props = {
    onClicked: Function;
    paginaAtual: number;
    tamanhaDasPaginas: number;
}


const Pagination = ({ onClicked, paginaAtual, tamanhaDasPaginas}: Props) => {
//const Pagination = () => {

    return (

        <div className="row d-flex justify-content-center">
            <nav>
                <ul className="pagination">
                    <li className= {`page-item ${paginaAtual===0  ? 'disabled': '' }`} >
                        <button className= "page-link "
                            onClick={() => onClicked(paginaAtual-1)}
                        >Anterior</button>
                    </li>
                    <li className="page-item disabled">
                        <span className="page-link">{paginaAtual +1} de {tamanhaDasPaginas}</span>
                    </li>
                    <li className= {`page-item ${paginaAtual===tamanhaDasPaginas-1  ? 'disabled': '' }`}>
                        <button className="page-link"
                            onClick={() => onClicked(paginaAtual+1)}
                        >Próxima</button>
                    </li>
                </ul>
            </nav>
        </div>

    );
}

export default Pagination;