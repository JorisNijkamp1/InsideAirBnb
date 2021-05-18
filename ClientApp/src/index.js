import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import thunk from "redux-thunk";
import * as Redux from "redux";
import {mainReducer} from "./Reducers/mainReducer";
import {Provider} from "react-redux";

const logger = (store) => (next) => (action) => {
    // console.log(store);
    // console.log('ACTION:', action.type, action);
    let result = next(action);
    console.log('STATE AFTER ACTION:', action.type, store.getState());
    return result;
};

const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) || Redux.compose

const middleware = [thunk];
// const middleware = [thunk]
const store = Redux.createStore(
    mainReducer,
    Redux.compose(
        Redux.applyMiddleware(...middleware),
        composeEnhancers
    )
);

const mainComponent = <Provider store={store}>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
</Provider>;

ReactDOM.render(mainComponent, document.getElementById('root'));