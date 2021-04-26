import { developersAPI } from '../api/api'
import { getOrders } from './orders-reducer'

const SET_DEVELOPERS = 'SET_DEVELOPERS'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'

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
                developers: action.developers.reverse()
            }
        default:
            return state;
    }
}

export const setDevelopers = (developers) => {
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

export const createNewDeveloper = (developer) => (dispatch) => {
    developersAPI.createNewDeveloper(developer)
        .then(response => {
            dispatch(getDevelopers())
        })
}

export const deleteDeveloper = (pn) => (dispatch) => {
    developersAPI.deleteDeveloper(pn)
        .then(response => {
            dispatch(getDevelopers())
            dispatch(getOrders())
        })
}

export const updateDeveloper = (developer) => (dispatch) => {
    developersAPI.updateDeveloper(developer)
        .then(response => {
            dispatch(getDevelopers())
        })
}

export default developersReducer