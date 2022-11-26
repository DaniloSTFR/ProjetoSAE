
import './styles.scss';

type Props = {
    historyRouter: any;
}

const HorizontalMenu = ({historyRouter}: Props) => {

    //history.push('/home/prontuario');//redirect aqui ou

    return (
        <div className="col-lg-12">
            <div className="g-2 row justify-content-md-center max-width-1240px">
                <div className="float-sm-start">
                    <button type="button" className="btn btn-lg" onClick={() => historyRouter.push('/home/prontuario')}>
                        <i className='bx bx-user nav_icon_hm'></i> 
                        <p>Novo paciente</p>    
                    </button>
                </div>
                <div className="float-sm-end">
                    <button type="button" className="btn btn-lg" onClick={() => historyRouter.push('/home/historico')}>
                        <i className='bx bx-history nav_icon_hm'></i> 
                        <p>Ver histórico</p> 
                    </button>
                </div>
                <div className="float-sm-start">
                    <button type="button" className="btn btn-lg" onClick={() => historyRouter.push('/home/rascunho')}>
                        <i className='bx bx-layer nav_icon_hm'></i> 
                        <p>Ver rascunhos</p> 
                    </button>
                </div>
                <div className="float-sm-end">
                    <button type="button" className="btn btn-lg" onClick={() => historyRouter.push('/home/notificacoes')}>
                        <i className='bx bx-message-square-detail nav_icon_hm'></i> 
                        <p>3 notificações</p>                        
                    </button>
                </div>
            </div>
        </div>
        
    );
};

export default HorizontalMenu;
