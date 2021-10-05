import axios from "axios";

export const GET_BREEDS = 'GET_BREEDS';
export const GET_BREED_BY_NAME = 'GET_BREED_BY_NAME';

/**
 * Esta funcion hace la consulta al localhost 
 * @returns Devuelve todas las razas. (API + DB)
 */
export function getBreeds() {
    return async function (dispatch) {
        // try {
            var json = await axios.get("http://localhost:3001/dogs");
            return dispatch({
                type: GET_BREEDS,
                payload: json.data,
            })
        // }
        // catch (error) {
        //     console.log(error);
        // }
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