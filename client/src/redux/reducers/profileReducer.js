import axios from "axios"
import {
    GET_ERRORS,
    GET_PROFILE,
    PROFILE_LOADING,
    PROFILE_NOT_FOUND,
    CLEAR_CURRENT_PROFILE,
    GET_PROFILES
}
    from "../types/index"

const initialState = {
    profile: null,
    profiles: null,
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            }
        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile: null
            }    
        default:
            return state
    }
}

export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading())

    axios.get('/api/profile')
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: {}
            })
        })
}

export const setProfileLoading = () => ({ type: PROFILE_LOADING })

export const clearCurrenProfile = () => ({ type: CLEAR_CURRENT_PROFILE })