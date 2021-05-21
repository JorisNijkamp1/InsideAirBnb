import * as Redux from 'redux';
import {MapReducer} from "./MapReducer";
import {LoginReducer} from "./LoginReducer";

export const mainReducer = Redux.combineReducers({
    mapReducer: MapReducer,
    loginReducer: LoginReducer
});