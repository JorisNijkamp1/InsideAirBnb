import {getToken} from "../AzureADConfig";

export function GetLocationsAction(){
    return async (dispatch) => {
        return await fetch('https://localhost:5001/api/locations', 
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
        return await fetch(`https://localhost:5001/api/location/${id}`,
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