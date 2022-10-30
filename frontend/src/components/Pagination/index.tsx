import './styles.scss';

type Props = {
    onClicked: Function;
    onClickeAnalise: Function
    paginaAtual: number;
    tamanhaDasPaginas: number;
}


const Pagination = ({ onClicked, onClickeAnalise, paginaAtual, tamanhaDasPaginas}: Props) => {

    function toTop(page:number){
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        onClicked(page)

    }
    
    return (

        <div className="row d-flex justify-content-center">
            <nav>
                <ul className="pagination">
                <hr /> 
                    <li className= {`col-6 page-item ${paginaAtual===0  ? 'disabled': '' }`} >
                        <button className= "page-link btn-lg"
                            onClick={() => toTop(paginaAtual-1)}
                        >Anterior</button>
                    </li>

                    <li className= "col-6 align-self-end page-item">
                        {  paginaAtual===tamanhaDasPaginas-1?  
                            <button className="page-link floatright btn-lg btn-primary"
                                    onClick={() => onClickeAnalise()}
                            >Analisar dados</button>
                        :
                            <button className="page-link floatright btn-lg btn-success"
                            onClick={() => toTop(paginaAtual+1)}
                            >Próximas</button>
                        }

                    </li>
                </ul>
            </nav>
        </div>

    );
}

export default Pagination;