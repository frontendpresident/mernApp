import { GET_ERRORS, CLEAR_ERRORS } from "../types/index"

const initialState = {}

export default function errorReducer (state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return action.payload
        case CLEAR_ERRORS:
            return {};
        default:
            return state
    }
}