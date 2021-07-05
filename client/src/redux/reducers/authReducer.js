import axios from "axios";
import setAuthToken from "../../utils/setAutToken"
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

export default function authReducer (state = initialState, action) {
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

// Register User
export const registerUser = (userData, history) => dispatch => {
    axios
      .post("/api/users/register", userData)
      .then(res => history.push("/login"))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
  
  // Login - Get User Token
  export const loginUser = userData => dispatch => {
    axios
      .post("/api/users/login", userData)
      .then(res => {
        // Save to localStorage
        const { token } = res.data;
        // Set token to localStorage
        localStorage.setItem("jwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        dispatch(setCurrentUser(decoded));
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  };
  
  // Set logged in user
  export const setCurrentUser = decoded => {
    return {
      type: SET_CURRENT_USER,
      payload: decoded
    };
  };
  
  // Log user out
  export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem("jwtToken");
    // Remove the auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
  };