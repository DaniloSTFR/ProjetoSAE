
import Home from "pages/Home";
import Formulario from "pages/Formulario";
import Login from "pages/Login";
import Cadastrar from "pages/Cadastrar";

import { BrowserRouter,Route,Switch } from "react-router-dom"
import { AuthContextProvider } from './contexts/AuthContext'



const Routes = () => {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/cadastrar" exact component={Cadastrar} />
                    <Route path="/home/:id" component={Home} exact/>
                    <Route path="/home/:id/:uuid" component={Home} exact/>
                    <Route path="/home" component={Home} exact/>
                    <Route path="/historico" component={Home} exact/>

                    
                    <Route path="/formulario" exact component={Formulario} />
                </Switch>
            </AuthContextProvider>
        </BrowserRouter>
    );
}

export default Routes;
