import './styles.scss';
import ProgressBar from 'react-bootstrap/ProgressBar';

type Props = {
    paginaAtual: number;
    tamanhaDasPaginas: number;
}

const BarraProgressao = ({paginaAtual, tamanhaDasPaginas}: Props) => {
    
    const progress = (paginaAtual+1) * (100/tamanhaDasPaginas);
    return (
        <>
        <div className="progressbar">
            <div className="row labelProgessBar">
                <div className="col-6 labelStart">Formulário {(paginaAtual+1) < 10 ? '0'+(paginaAtual+1) 
                        : paginaAtual+1 }</div>
                <div className="col-6 align-self-end labelEnd">de {(tamanhaDasPaginas) < 10 ? '0'+(tamanhaDasPaginas) 
                        : tamanhaDasPaginas }</div>
            </div>
            <div className="row">
                <div className="col-12 "><ProgressBar striped variant="success" now={progress} /></div>
            </div>
            <hr />   
        </div>  
        </>
    );
}

export default BarraProgressao;