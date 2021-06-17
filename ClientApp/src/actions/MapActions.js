import {getToken} from "../AzureADConfig";

const API_URL = "https://localhost:6001";
// const API_URL = "https://school-projecten.azurewebsites.net";

export function GetLocationsAction(){
    return async (dispatch) => {
        return await fetch(`${API_URL}/api/locations`, 
            {
                headers: {
                    authorization: `Bearer ${getToken()}`,
                    'content-type': 'application/json',
                }
            })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                    dispatch(handleLocationsAction(res));
            }).catch(err => {
                console.log(err)
            })
    }
}

function handleLocationsAction(data){
    return {
        type: 'GetLocations',
        value: data
    }
}

export function GetLocationDetailAction(id){
    return async (dispatch) => {
        return await fetch(`${API_URL}/api/location/${id}`,
            {
                headers: {
                    authorization: `Bearer ${getToken()}`,
                    'content-type': 'application/json',
                }
            })
            .then((res) => {
                console.log(res);
                return res.json();
            })
            .then((res) => {
                dispatch(handleLocationDetailAction(res));
            }).catch(err => {
                console.log(err)
            })
    }
}

function handleLocationDetailAction(data){
    return {
        type: 'GetLocationDetail',
        value: data
    }
}