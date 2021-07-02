import axios from "axios";
import { 
    GET_ERRORS,
    REGISTER_USER
} 
from "../types";

const initialState = {
    isAuthenticated: false,
    user: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case REGISTER_USER:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}

//Register user
export const registerActions = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
            .then(res =>  history.push('/login'))
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            })
}

