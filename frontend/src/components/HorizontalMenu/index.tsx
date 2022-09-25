
import './styles.scss';

const HorizontalMenu = () => {

    return (
        <div className="col-lg-12">
            <div className="g-2 row justify-content-md-center max-width-1240px">
                <div className="float-sm-start">
                    <button type="button" className="btn btn-lg" onClick={() => console.log("Menu Novo paciente")}>
                        <i className='bx bx-user nav_icon_hm'></i> 
                        <p>Novo paciente</p>    
                    </button>
                </div>
                <div className="float-sm-end">
                    <button type="button" className="btn btn-lg" onClick={() => console.log("Menu Ver histórico")}>
                        <i className='bx bx-history nav_icon_hm'></i> 
                        <p>Ver histórico</p> 
                    </button>
                </div>
                <div className="float-sm-start">
                    <button type="button" className="btn btn-lg" onClick={() => console.log("Menu Ver rascunhos")}>
                        <i className='bx bx-layer nav_icon_hm'></i> 
                        <p>Ver rascunhos</p> 
                    </button>
                </div>
                <div className="float-sm-end">
                    <button type="button" className="btn btn-lg" onClick={() => console.log("Menu 3 notificações")}>
                        <i className='bx bx-message-square-detail nav_icon_hm'></i> 
                        <p>3 notificações</p>                        
                    </button>
                </div>
            </div>
        </div>
        
    );
};

export default HorizontalMenu;
