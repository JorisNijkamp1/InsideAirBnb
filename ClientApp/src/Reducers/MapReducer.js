const initialState = {
    locations: [],
    selectedLocation: {}
};

export function MapReducer(state = initialState, action) {
    switch (action.type) {
        case 'GetLocations':
            return {...state, locations: action.value};
        case 'GetLocationDetail':
            return {...state, selectedLocation: action.value};
        default:
            return state;
    }
}