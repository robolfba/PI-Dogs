import { GET_BREEDS, GET_BREED_BY_NAME, FILTER_BREEDS, ORDER_BY_NAME, GET_TEMPERAMENTS, FILTER_TEMPERAMENTS, POST_BREED, GET_DETAIL, ORDER_BY_WEIGHT,RESET_DETAIL } from '../actions/';

const initialState = {
    breeds: [],
    allBreeds: [], // Este estado sirve de soporte para que funcione bien el filtrado (siempre va a tener todas las razas)
    temperaments: [],
    detail: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_BREEDS:
            console.log('Reducer GET_BREEDS ----> ', action.payload);
            return {
                ...state,
                breeds: action.payload,
                allBreeds: action.payload
            }
        case GET_BREED_BY_NAME:
            console.log('Reducer GET_BREED_BY_NAME ----> ', action.payload);
            return {
                ...state,
                breeds: action.payload
            }
        case FILTER_TEMPERAMENTS:
            console.log('Reducer FILTER_TEMPERAMENTS ----> ', action.payload)
            //  let aux = allTemperaments.filter(e => {return (e.temperament && e.temperament.includes(action.payload))||(e.temperaments && e.temperaments.some(b => b.name === action.payload))  })
            const allBreeds2 = state.allBreeds;

            let filtered = [];
            if (action.payload === 'AllTemperaments') {
                filtered = allBreeds2;
            }
            else {
                for (let i = 0; i < allBreeds2.length; i++) {
                    //Si es de la API ---> temperament:"Aloof, Clownish,..."
                    if (allBreeds2[i].temperament && allBreeds2[i].temperament.includes(action.payload)) {
                        filtered.push(allBreeds2[i]);
                    }
                    // Si es de la DB --> "temperaments":[{name:"Brave"},{name:"algo"},{...}]
                    if (allBreeds2[i].temperaments) {
                        if (allBreeds2[i].temperaments.length > 0) {
                            for (let j = 0; j < allBreeds2[i].temperaments.length; j++) {
                                if (allBreeds2[i].temperaments[j].name === action.payload) {
                                    filtered.push(allBreeds2[i]);
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            console.log('esto es el filtered--->', filtered);
            // ACA ESTARIA DEVOLVIENDO UN ARREGLO DE RAZAS QUE MATCHEARON CON EL TEMPERAMENTO QUE VIENE EN ACTION.PAYLOAD
            return {
                ...state,
                breeds: filtered
            }
        case FILTER_BREEDS:
            console.log('Reducer FILTER_BREEDS ----> ', action.payload);
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
            console.log('Reducer ORDER_BY_NAME ----> ', action.payload);
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
            console.log('Reducer GET_TEMPERAMENTS ----> ', action.payload);
            return {
                ...state,
                temperaments: action.payload,
            }

        case POST_BREED:
            console.log('Reducer POST_BREED ----> ', action.payload);
            return {
                ...state,
                breeds: [...state.breeds, action.payload]
            }
        case GET_DETAIL:
            console.log('Reducer GET_DETAIL----> ', action.payload);
            return {
                ...state,
                detail: action.payload
            }
        case ORDER_BY_WEIGHT:
            console.log('Reducer ORDER_BY_WEIGHT----> ', action.payload);
            function promedio(string) {
                let [a, b] = string.split(' - ');
                return ((parseInt(a) + parseInt(b)) / 2);
            }
            const arraySort = action.payload === 'menor' ?
                state.breeds.sort(function (a, b) {
                    if (promedio(a.weight) > promedio(b.weight)) {
                        return 1;
                    }
                    if (promedio(b.weight) > promedio(a.weight)) {
                        return -1;
                    }
                    return 0;
                }) :
                state.breeds.sort(function (a, b) {
                    if (promedio(a.weight) > promedio(b.weight)) {
                        return -1;
                    }
                    if (promedio(b.weight) > promedio(a.weight)) {
                        return 1;
                    }
                    return 0;
                })

            return {
                ...state,
                breeds: arraySort
            }
            case RESET_DETAIL:
                return {
                    ...state,
                    detail: []
                }
        default:
            return state;
    }
}
export default rootReducer;