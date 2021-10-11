import axios from "axios";

export const GET_BREEDS = 'GET_BREEDS';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const GET_BREED_BY_NAME = 'GET_BREED_BY_NAME';
export const FILTER_BREEDS = 'FILTER_BREEDS';
export const FILTER_TEMPERAMENTS = 'FILTER_TEMPERAMENTS';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const POST_BREED = 'POST_BREED';
export const GET_DETAIL = 'GET_DETAIL';
export const ORDER_BY_WEIGHT = 'ORDER_BY_WEIGHT';
export const RESET_DETAIL = 'RESET_DETAIL';

export function getBreeds() {
    return async function (dispatch) {
        try {
            const json = await axios.get("http://localhost:3001/dogs");
            return dispatch({
                type: GET_BREEDS,
                payload: json.data,
            })
        }
        catch (error) {
            console.log('Actions - getBreeds---> ', error);
        }
    }
}

export function getBreedByName(name) {
    return async function (dispatch) {
        try {
            const json = await axios.get("http://localhost:3001/dogs?name=" + name);
            return dispatch({
                type: GET_BREED_BY_NAME,
                payload: json.data,
            })
        }
        catch (error) {
            console.log('Actions - getBreedByName---> ', error);
        }
    }
}

export function filterBreeds(payload) {
    return {
        type: FILTER_BREEDS,
        payload
    }
}

export function orderByName(payload) {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export function getTemperaments() {
    return async function (dispatch) {
        try {
            const json = await axios.get("http://localhost:3001/temperament");
            return dispatch({
                type: GET_TEMPERAMENTS,
                payload: json.data,
            })
        }
        catch (error) {
            console.log('Actions - getTemperaments---> ', error);
        }
    }
}

export function filterTemperaments(payload) {
    console.log('Actions - filterTemperaments---> ', payload);
    return {
        type: FILTER_TEMPERAMENTS,
        payload
    }
}

export function postBreed(payload) {
    return async function (dispatch) {
        try {
            await axios.post("http://localhost:3001/dog", payload);
            console.log('Actions - postBreed---> payload', payload);

            return dispatch({
                type: POST_BREED,
                payload
            })
        }
        catch (error) {
            console.log('Actions - postBreed---> ', error);
        }
    }
}
export function getDetail(id) {
    return async function (dispatch) {
        try {
            const json = await axios.get("http://localhost:3001/dogs/" + id);
            console.log('Actions - getDetail---> json.data', json.data);
            return dispatch({
                type: GET_DETAIL,
                payload: json.data
            })
        }
        catch (error) {
            console.log('Actions - getDetail---> ', error);
        }
    }
}
export function orderByWeight(payload) {
    return {
        type: ORDER_BY_WEIGHT,
        payload
    }
}
export function resetDetail() {
    console.log('Actions - resetDetail---> sin payload');
    return {
        type: RESET_DETAIL,
        // payload
    }
}
