import * as Redux from 'redux';
import {MapReducer} from "./MapReducer";
import {RegisterReducer} from "./RegisterReducer";

export const mainReducer = Redux.combineReducers({
    mapReducer: MapReducer,
    registerReducer: RegisterReducer
});