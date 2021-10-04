import { GET_BREEDS, GET_BREED_BY_NAME } from '../actions/';

const initialState = {
    breeds: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_BREEDS:
            return {
                ...state,
                breeds: action.payload
            }
        case GET_BREED_BY_NAME:
            return {
                ...state,
                breeds: action.payload
            }
        default:
            return state;
    }
}
export default rootReducer;