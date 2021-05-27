import * as Redux from 'redux';
import {MapReducer} from "./MapReducer";

export const mainReducer = Redux.combineReducers({
    mapReducer: MapReducer,
});