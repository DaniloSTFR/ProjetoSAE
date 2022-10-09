import { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import { useAuth } from 'hooks/useAuth';
import ReactDOM from 'react-dom';

//import Formulario from "pages/Formulario";
import FormProntuario from "components/FormProntuario";
import HorizontalMenu from "components/HorizontalMenu";
import HistoricoTable from "components/HistoricoTable";
import Formulario from "pages/Formulario";

import 'styles/home-menu.scss';

type HomeParams = {
    id: string;
    uuid: string;
  }

const Home = () => {
    const {usuario, signOutAction, getServiceRequestApi} = useAuth();
    const [menuTitulo, setMenuTitulo] = useState(`Olá, ${usuario?.tagUsuario}`);
    const params = useParams<HomeParams>();
    const history = useHistory();
    
    function toHomeComponent(idRouter: string, uuidProntuario: string){
        console.log(`Avançar idRouter: ${idRouter}`);
        console.log(`Avançar uuidProntuario: ${uuidProntuario}`);
        //toHomeComponent("formulario",uuidProntuario)
        history.push(`/home/${idRouter}/${uuidProntuario}`);
    }

    useEffect(() => {
        if(params.id === "prontuario"){
          setMenuTitulo(`Novo paciente`);
          CarrregarComponente( <FormProntuario  usuarioContext = {usuario} toHomeComponent = {toHomeComponent}/>)
        } else
        if(params.id === "formulario"){
            setMenuTitulo(`Formulário`);
            const numeroprontuario = Number(params.uuid);
            CarrregarComponente(<Formulario usuarioContext = {usuario} historyRouter = {history} numeroprontuario = {numeroprontuario}/>);
        }else
        if(params.id === "historico"){
            setMenuTitulo(`Histórico`);
            CarrregarComponente(<div>Formulário Histórico</div>);
            callService();
        }else
        if(params.id === "rascunho"){
            setMenuTitulo(`Rascunho`);
            CarrregarComponente(<div>Formulário Rascunho</div>);
        } else
        if(params.id === "notificacoes"){
            setMenuTitulo(`Notificações`);
            CarrregarComponente(<div>Formulário Notificações</div>);
        }else{
            setMenuTitulo(`Olá, ${usuario?.tagUsuario}`);
            CarrregarComponente(<><div><HorizontalMenu historyRouter = {history}/></div> <div><HistoricoTable/></div></>);
        }
      // eslint-disable-next-line
      }, [params.id,usuario]);

      async function callService(){
        console.log(usuario);
        const api  = await getServiceRequestApi();
        const result = await api.get('/');
        console.log(result.data);
      }

    async function CarrregarComponente( component:any){
         ReactDOM.render (component, document.getElementById('main_components'));
    }; 

    async function clickOpenCloseMenu(){
        console.log("clickOpenCloseMenu")

        const showNavbar = (toggleId: string, navId: string, bodyId: string, headerId: string) => {
            const toggle = document.getElementById(toggleId),
              nav = document.getElementById(navId),
              bodypd = document.getElementById(bodyId),
              headerpd = document.getElementById(headerId);
            // Validate that all variables exist
            if (toggle && nav && bodypd && headerpd) {
              //toggle.addEventListener('click', () => {
                // show navbar
                nav.classList.toggle('show_menu')
                // change icon
                toggle.classList.toggle('bx-x')
                // add padding to body
                bodypd.classList.toggle('body-pd')
                // add padding to header
                headerpd.classList.toggle('body-pd')
              //})
            }
          }
        
          showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header')
    };

        /*===== LINK ACTIVE =====*/
    const linkColor = document.querySelectorAll('.nav_link')

    function colorLink(this: any) {
        if (linkColor) {
        linkColor.forEach(l => l.classList.remove('active'))
        // eslint-disable-next-line
        this.classList.add('active')
        }
    }
    linkColor.forEach(l => l.addEventListener('click', colorLink))

    return (
        <div className="body-menu">
            <main id="body-pd"  style={{padding: "0px"}}>
                <header className="header" id="header">
                    <div className="header_toggle"> 
                    <i className='bx bx-menu' id="header-toggle" onClick={clickOpenCloseMenu}></i>  </div>
                    <div><h2>{menuTitulo}</h2></div>
                    
                    {/* <div className="header_img"> <img src="https://i.imgur.com/hczKIze.jpg" alt=""> </div> */}
                </header>
                <div className="l-navbar" id="nav-bar">
                    <nav className="nav">
                        <div> 

                            <Link className="nav_logo active" to="/home">
                                <i className='bx bx-home nav_logo-icon'></i> 
                                <span className="nav_logo-name">Home</span>
                            </Link>
                            
                            <div className="nav_list"> 
                            
                                <Link className="nav_link" to="/home/prontuario">
                                    <i className='bx bx-user nav_icon'></i> 
                                    <span className="nav_name">Novo paciente</span>
                                </Link>

                                <Link className="nav_link" to="/home/historico">
                                    <i className='bx bx-history nav_icon'></i>
                                    <span className="nav_name">Ver histórico</span>
                                </Link>

                                <Link className="nav_link" to="/home/rascunho">
                                    <i className='bx bx-layer nav_icon'></i> 
                                    <span className="nav_name">Ver rascunhos</span>
                                </Link>

                                <Link className="nav_link" to="/home/notificacoes">
                                    <i className='bx bx-message-square-detail nav_icon'></i> 
                                    <span className="nav_name">3 notificações</span>
                                </Link>  
                                <Link className="nav_link" to="/" onClick={() => signOutAction()}>
                                    <i className='bx bx-log-out nav_icon'></i> 
                                    <span className="nav_name">Sair</span>
                                </Link>            

                            </div>
                        </div> 

                    </nav>
                </div>
                {/* <!--Container Main start--> */}
                <div className="height-100 bg-light">
                    
                    <div id="main_components"></div>
                </div>
                {/* Container Main end */}

            </main>

        </div>
    );
}

export default Home;


