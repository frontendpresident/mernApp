import axios from "axios"
import {
    GET_ERRORS,
    GET_PROFILE,
    PROFILE_LOADING,
    PROFILE_NOT_FOUND,
    CLEAR_CURRENT_PROFILE,
    GET_PROFILES,
    SET_CURRENT_USER
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
            debugger
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        })
        .catch(err => {
            debugger
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        })
}

export const setProfileLoading = () => ({ type: PROFILE_LOADING })

export const clearCurrenProfile = () => ({ type: CLEAR_CURRENT_PROFILE })

export const deleteAccount = () => dispatch => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
      axios
        .delete('/api/profile')
        .then(res =>
          dispatch({
            type: SET_CURRENT_USER,
            payload: {}
          })
        )
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        );
    }
  }

  export const createProfile = (profileData, history) => dispatch => {
    axios
      .post('/api/profile', profileData)
      .then(res => history.push('/dashboard'))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

  export const addExperience = (expData, history) => dispatch => {
    axios
      .post('/api/profile/experience', expData)
      .then(res => history.push('/dashboard'))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

  export const deleteExperience = id => dispatch => {
    axios
      .delete(`/api/profile/experience/${id}`)
      .then(res =>
        dispatch({
          type: GET_PROFILE,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

  export const addEducation = (eduData, history) => dispatch => {
    axios
      .post('/api/profile/education', eduData)
      .then(res => history.push('/dashboard'))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

  export const deleteEducation = id => dispatch => {
    axios
      .delete(`/api/profile/education/${id}`)
      .then(res =>
        dispatch({
          type: GET_PROFILE,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
  