export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";

export const loginUserSucess = value => ({
    type: LOGIN_USER_SUCCESS,
    payload: value || "",
});

export const loginUserFailure = value => ({
    type: LOGIN_USER_FAILURE,
    payload: value,
});