import { developersAPI } from "../api/api"

const SET_DEVELOPERS = "SET_DEVELOPERS"
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"

let initialState = {
    developers: [],
    isFetching: true,
}

const developersReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case SET_DEVELOPERS:
            return {
                ...state,
                developers: action.developers
            }
        default:
            return state;
    }
}

export const setDevelopers = (developers) => {
    debugger
    return {
        type: SET_DEVELOPERS,
        developers: developers,
    }
}

export const toggleIsFetching = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching: isFetching,
    }
}

export const getDevelopers = () => (dispatch) => {
    dispatch(toggleIsFetching(true));
    developersAPI.getDevelopers()
        .then(developers => {
            dispatch(toggleIsFetching(false));
            dispatch(setDevelopers(developers));
        })
}

export default developersReducer