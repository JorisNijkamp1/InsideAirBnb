import React, {Component} from 'react';
import {Route} from 'react-router';
import {Layout} from './components/Layout';
import './custom.css'
import {MapView} from "./components/MapView";
import {Login} from "./components/Login";
import {SigninOIDC} from "./pages/signin-oidc";
import {Home} from "./components/Home";
import {authContext, getToken} from "./AzureADConfig";
import {Logout} from "./components/Logout";

export const App = () => {

    console.log(authContext.getCachedUser());
    console.log(getToken())
    return (
        <Layout>
            <Route exact path='/' component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/logout" component={Logout}/>
            <Route path='/map' component={MapView}/>
            <Route path='/signin-oidc' component={SigninOIDC}/>
        </Layout>
    );
}
