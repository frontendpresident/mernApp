import axios from "axios";

import {
  ADD_POST,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST
} from "../types/index";

const initialState = {
    posts: [],
    post: {},
    loading: false
}

export default function (state = initialState, action) {
    switch(action.type) {
        case POST_LOADING: 
        return {
            ...state,
            loading: true
        }
        case ADD_POST: 
        return {
            ...state,
          posts: [action.payload, ...state.posts]
        }
        case GET_POSTS: 
        return{
            ...state,
            posts: action.payload,
            loading: false
        }
        case GET_POST:
            return {
                ...state, 
                post: action.payload,
                loading: false
            }
        case DELETE_POST: 
        return {
            ...state,
            posts: state.posts.filter(post => post._id !== action.payload )
        }    
        default:
            return state
    }
}

export const clearErrors = () => ({type: CLEAR_ERRORS});

export const setPostLoading = () => ({type: POST_LOADING})

export const addPost = post => dispatch => {
    dispatch(clearErrors())
    axios
    .post('api/posts', post)
    .then(res => {
        dispatch({
            type: ADD_POST,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}

export const getAllPosts = () => dispatch => {
    dispatch(setPostLoading())
    axios
    .get('/api/posts')
    .then(res => {
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_POSTS,
            payload: null
        })
    })
}

export const getPost = id => dispatch => {
    dispatch(setPostLoading())
    axios
    .get(`/api/posts/${id}`)
    .then(res => {
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_POST,
            payload: null
        })
    })
}  

export const deletePost = id => dispatch => {
    axios
    .delete(`/api/posts/${id}`)
    .then(res => {
        dispatch({
            type: DELETE_POST,
            payload: id
        })
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}

export const addLike = id => dispatch => {
    dispatch(setPostLoading())
    axios
    .post(`/api/posts/like/${id}`, id)
    .then(res => {
        dispatch(getAllPosts())
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}

export const removeLike = id => dispatch => {
    dispatch(setPostLoading())
    axios
    .post(`/api/posts/unlike/${id}`, id)
    .then(res => {
        dispatch(getAllPosts())
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
} 

export const addComment = (postId, commentData) => dispatch => {
    dispatch(clearErrors());
    axios
      .post(`/api/posts/comment/${postId}`, commentData)
      .then(res =>
        dispatch({
          type: GET_POST,
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
  
  export const deleteComment = (postId, commentId) => dispatch => {
    axios
      .delete(`/api/posts/comment/${postId}/${commentId}`)
      .then(res =>
        dispatch({
          type: GET_POST,
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