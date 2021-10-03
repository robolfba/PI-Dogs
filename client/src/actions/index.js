import axios from "axios";

export function getBreeds() {
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/dogs");//http://localhost:3001/dogs
        console.log('ESTO DEVUELVE EL JSON--------->',json);
        return dispatch({
            type: 'GET_BREEDS',
            payload: json.data,
        })
    }
}