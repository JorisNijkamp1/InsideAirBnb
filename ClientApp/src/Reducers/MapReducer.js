const initialState = {
    locations: []
};

export function MapReducer(state = initialState, action){
    switch (action.type){
        case 'GetLocations':
            return { ...state, locations: action.value };
        default:
            return state;
    }
}