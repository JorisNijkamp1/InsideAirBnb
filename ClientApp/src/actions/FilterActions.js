import {getToken} from "../AzureADConfig";

export function FilterPriceAction(priceFilter) {
    return async (dispatch) => {
        console.log(JSON.stringify({filter: priceFilter}))
        if (priceFilter === "") {
            priceFilter = 0;
        }
        return await fetch('https://localhost:5001/api/locations/filter/price',
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
        console.log(JSON.stringify({filter: neighbourhoodFilter}))
        return await fetch('https://localhost:5001/api/locations/filter/neighbourhood',
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

function handleFilter(data) {
    return {
        type: 'Filter',
        value: data
    }
}