import Dashboard from "pages/Dashboard";
import Home from "pages/Home";
import Formulario from "pages/Formulario";
import React from "react";
import { BrowserRouter,Route,Switch } from "react-router-dom"

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route> 
                <Route path="/dashboard" >
                    <Dashboard />
                </Route> 
                <Route path="/formulario" >
                    <Formulario />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
