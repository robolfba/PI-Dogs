import { GET_BREEDS, GET_BREED_BY_NAME, FILTER_BREEDS, ORDER_BY_NAME,GET_TEMPERAMENTS, FILTER_TEMPERAMENTS } from '../actions/';

const initialState = {
    breeds: [],
    allBreeds: [], // Este estado sirve de soporte para que funcione bien el filtrado (siempre va a tener todas las razas)
    temperaments: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_BREEDS:
            return {
                ...state,
                breeds: action.payload,
                allBreeds: action.payload
            }
        case GET_BREED_BY_NAME:
            return {
                ...state,
                breeds: action.payload
            }
        case FILTER_BREEDS:
            const allBreeds = state.allBreeds;
            let filterSelect;
            if (action.payload === 'AllBreeds') {
                filterSelect = allBreeds;
            }
            else if (action.payload === 'Created') {
                filterSelect = allBreeds.filter(e => !(typeof e.id === 'number'));
            }
            else {
                filterSelect = allBreeds.filter(e => typeof e.id === 'number');
            }
            return {
                ...state,
                breeds: filterSelect
            }
        case ORDER_BY_NAME:
            const sortedArr = action.payload === 'asc' ?
                state.breeds.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                }) :
                state.breeds.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                breeds: sortedArr,
            }
            case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload,
            }
        default:
            return state;
    }
}
export default rootReducer;