import { authAPI } from "../api/api";

const SET_USER_DATA = "SET_USER_DATA"

let initialState = {
    userId: null,
    email: null,
    isAuth: false,
    count: 0,
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

export const setAuthUserData = (userId, email, isAuth, count) => {
    return {
        type: SET_USER_DATA,
        payload: { userId, email, isAuth, count },
    }
}

// export const getAuthUserData = () => (dispatch) => {
//     authAPI.me()
//         .then(response => {
//             if (response.data.resultCode === 0) {
//                 let { id, email, } = response.data.data;
//                 dispatch(setAuthUserData(id, email, true));
//             }
//         })
// }

export const login = (email, password) => (dispatch) => {
    authAPI.login(email, password)
        .then(response => {
            if (response.data.schema.resultCode === 0) {
                dispatch(setAuthUserData(response.data.schema.id, email, true, 0))
            } else {
                dispatch(setAuthUserData(null, null, false, 1))
            }
        })
}

export const logout = () => (dispatch) => {
    dispatch(setAuthUserData(null, null, false, 0))
}

export default authReducer