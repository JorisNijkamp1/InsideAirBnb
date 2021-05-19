import React, {Component} from 'react';
import {Route} from 'react-router';
import {Layout} from './components/Layout';
import {Home} from './components/Home';
import {FetchData} from './components/FetchData';
import './custom.css'
import {MapView} from "./components/MapView";
import {Login} from "./components/Login";
import {Register} from "./components/Register";

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home}/>
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register}/>
                <Route path='/fetch-data' component={FetchData}/>
                <Route path='/map' component={MapView}/>
            </Layout>
        );
    }
}
