import { authAPI } from "../api/api";

const SET_USER_DATA = "SET_USER_DATA"

let initialState = {
    userId: null,
    email: null,
    // email: 'mirgayazow2014@yandex.ru',
    isAuth: false,
    count: 0,
    // name: {
    // full_name: '123'/
    // },
    name: null,
    // position: 'tester',
    position: null,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}

export const setAuthUserData = (userId, email, isAuth, count, name, position) => {
    return {
        type: SET_USER_DATA,
        payload: { userId, email, isAuth, count, name, position },
    }
}

export const login = (email, password) => (dispatch) => {
    authAPI.login(email, password)
        .then(response => {
            if (response.data.schema.resultCode === 0) {
                if (response.data.schema.position === 'manager') {
                    dispatch(setAuthUserData(response.data.schema.id, email, true, 0, 'manager', 'manager'))
                } if (response.data.schema.position === 'admin') {
                    dispatch(setAuthUserData(response.data.schema.id, email, true, 0, 'admin', 'admin'))
                } else {
                    dispatch(setAuthUserData(response.data.schema.id, email, true, 0, response.data.schema.name, response.data.schema.position))
                }
            } else {
                dispatch(setAuthUserData(null, null, false, 1, null, null))
            }
        })
}

export const resetPassword = (email) => (dispatch) => {
    authAPI.resetPassword(email)
        .then(response => {
            if (response.data.schema.resultCode === 0) {
                dispatch(setAuthUserData(response.data.schema.id, email, true, 0, response.data.schema.name, response.data.schema.position))
            } else {
                dispatch(setAuthUserData(null, null, false, 1, null, null))
            }
        })
}

export const logout = () => (dispatch) => {
    dispatch(setAuthUserData(null, null, false, 0, null, null))
}

export default authReducer