import {getToken} from "../AzureADConfig";

export function FilterPriceAction(priceFilter) {
    return async (dispatch) => {
        console.log(JSON.stringify({filter: priceFilter}))
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
                console.log(res)
                return res.json();
            })
            .then((res) => {
                dispatch(handleFilterPrice(res));
            }).catch(err => {
                console.log(err)
            })
    }
}

function handleFilterPrice(data) {
    return {
        type: 'FilterPrice',
        value: data
    }
}