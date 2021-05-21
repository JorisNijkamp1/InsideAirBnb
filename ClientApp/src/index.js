import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import thunk from "redux-thunk";
import * as Redux from "redux";
import {mainReducer} from "./Reducers/mainReducer";
import {Provider} from "react-redux";
import {runWithAdal} from 'react-adal';
import {authContext} from './AzureADConfig';
import {App} from "./App";

const logger = (store) => (next) => (action) => {
    // console.log(store);
    // console.log('ACTION:', action.type, action);
    let result = next(action);
    console.log('STATE AFTER ACTION:', action.type, store.getState());
    return result;
};

const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) || Redux.compose

const middleware = [thunk];
export const store = Redux.createStore(
    mainReducer,
    Redux.compose(
        Redux.applyMiddleware(...middleware),
        composeEnhancers
    )
);

const DO_NOT_LOGIN = true;

const mainComponent = <Provider store={store}>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
</Provider>;
    
runWithAdal(authContext, () => {
    ReactDOM.render(mainComponent, document.getElementById('root'));    
}, DO_NOT_LOGIN);    
        
