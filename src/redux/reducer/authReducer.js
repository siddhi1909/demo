import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
} from "../actions/authActions";

const initialState = {
    user: "",
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                user: action.payload
            }
        case LOGIN_USER_FAILURE:
            return {
                ...state,
                user: ''
            }
        default:
            return state;
    }
}