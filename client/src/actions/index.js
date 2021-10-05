import axios from "axios";

export const GET_BREEDS = 'GET_BREEDS';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const GET_BREED_BY_NAME = 'GET_BREED_BY_NAME';
export const FILTER_BREEDS = 'FILTER_BREEDS';
export const FILTER_TEMPERAMENTS = 'FILTER_BREEDS';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';

/**
 * Esta funcion hace la consulta al localhost 
 * @returns Devuelve todas las razas. (API + DB)
 */
export function getBreeds() {
    return async function (dispatch) {
            const json = await axios.get("http://localhost:3001/dogs");
            return dispatch({
                type: GET_BREEDS,
                payload: json.data,
            })
    }
}

/**
 * Esta funcion recibe un "name" que se usa en la ruta, pasandose por query
 * @param {string} name Es el nombre de la raza a buscar
 * @returns Devuelve las razas que matcheen con name. (API + DB)
 */
export function getBreedByName(name) { 
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/dogs?name=" + name);
        return dispatch({
            type: GET_BREED_BY_NAME,
            payload: json.data,
        })
    }
}

export function filterBreeds(payload){
    return {
        type: FILTER_BREEDS,
        payload
    }
}

export function orderByName(payload){
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export function getTemperaments() {
    return async function (dispatch) {
            const json = await axios.get("http://localhost:3001/temperament");
            return dispatch({
                type: GET_TEMPERAMENTS,
                payload: json.data,
            })
    }
}

export function filterTemperaments(payload){
    return {
        type: FILTER_TEMPERAMENTS,
        payload
    }
}