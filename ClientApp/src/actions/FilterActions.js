import {getToken} from "../AzureADConfig";

//const API_URL = "https://localhost:6001";
 const API_URL = "https://school-projecten.azurewebsites.net";

export function FilterPriceAction(priceFilter) {
    return async (dispatch) => {
        if (priceFilter === "") {
            priceFilter = 0;
        }
        return await fetch(`${API_URL}/api/locations/filter/price`,
            {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${getToken()}`,
                    'content-type': 'application/json',
                },
                body: JSON.stringify({price: priceFilter})
            })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                dispatch(handleFilter(res));
            }).catch(err => {
                console.log(err)
            })
    }
}

export function FilterNeighbourhoodAction(neighbourhoodFilter) {
    return async (dispatch) => {
        return await fetch(`${API_URL}/api/locations/filter/neighbourhood`,
            {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${getToken()}`,
                    'content-type': 'application/json',
                },
                body: JSON.stringify({neighbourhood: neighbourhoodFilter})
            })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                dispatch(handleFilter(res));
            }).catch(err => {
                console.log(err)
            })
    }
}

export function FilterReviewAction(reviewFilter) {
    return async (dispatch) => {
        return await fetch(`${API_URL}/api/locations/filter/review`,
            {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${getToken()}`,
                    'content-type': 'application/json',
                },
                body: JSON.stringify({reviewScoreValue: reviewFilter})
            })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                dispatch(handleFilter(res));
            }).catch(err => {
                console.log(err)
            })
    }
}

function handleFilter(data) {
    return {
        type: 'Filter',
        value: data
    }
}