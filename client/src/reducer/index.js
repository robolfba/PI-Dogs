import { GET_BREEDS, GET_BREED_BY_NAME, FILTER_BREEDS } from '../actions/';

const initialState = {
    breeds: [],
    allBreeds:[] // Este estado sirve de soporte para que funcione bien el filtrado (siempre va a tener todas las razas)
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
        default:
            return state;
    }
}
export default rootReducer;