import Dashboard from "pages/Dashboard";
import Home from "pages/Home";
import Formulario from "pages/Formulario";
import Login from "pages/Login";
import Cadastrar from "pages/Cadastrar";

import React from "react";
import { BrowserRouter,Route,Switch } from "react-router-dom"
import { AuthContextProvider } from './contexts/AuthContext'


const Routes = () => {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Switch>
                    <Route path="/" exact>
                        <Login />
                    </Route> 
                    <Route path="/cadastrar" exact>
                        <Cadastrar />
                    </Route> 
                    <Route path="/home" exact>
                        <Home />
                    </Route> 
                    <Route path="/dashboard" exact>
                        <Dashboard />
                    </Route> 
                    <Route path="/formulario" exact>
                        <Formulario />
                    </Route>
                </Switch>
            </AuthContextProvider>
        </BrowserRouter>
    );
}

export default Routes;
