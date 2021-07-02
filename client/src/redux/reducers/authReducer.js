import axios from "axios";
import setAutToken from "../../utils/setAutToken"
import jwt_decode from "jwt-decode"
import isEmpty from "../../validation/is-empty";
import {
    GET_ERRORS,
    SET_CURRENT_USER
}
    from "../types";

const initialState = {
    isAuthenticated: false,
    user: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER: {
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        }
        default:
            return state;
    }
}

//Register user
export const registerActions = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

//Login user
export const loginUser = (userData) => dispatch => {
    axios.post('api/users/login', userData)
        .then(res => {
            const { token } = res.data
            localStorage.setItem('jwtToken', token)
            setAutToken(token)
            const decode = jwt_decode(token)
            dispatch(setCurrentUser(decode))
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

//Set loged user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

//Logout User
export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken')
    setAutToken(false)
    dispatch(setCurrentUser({}))
}