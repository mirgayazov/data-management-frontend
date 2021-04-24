import { testersAPI } from "../api/api"

const ADD_TESTER = "ADD_TESTER"
const SET_TESTERS = "SET_TESTERS"
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"

let initialState = {
    testers: [],
    isFetching: true,
}

const testersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TESTER:
            return {
                ...state,
                testers: [...state.posts, { id: "5", fullName: "Миргаязов К.И.5" }],
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case SET_TESTERS:
            return {
                ...state,
                testers: action.testers.reverse()
            }
        default:
            return state;
    }
}

export const addTester = () => {
    return {
        type: ADD_TESTER
    }
}

export const setTesters = (testers) => {
    return {
        type: SET_TESTERS,
        testers: testers,
    }
}

export const toggleIsFetching = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching: isFetching,
    }
}

export const getTesters = () => (dispatch) => {
    testersAPI.getTesters()
        .then(testers => {
            dispatch(setTesters(testers));
        })
}

export const createNewTester = (tester) => (dispatch) => {
    testersAPI.createNewTester(tester)
        .then(response => {
            dispatch(getTesters())
        })
}

export const updateTester = (tester) => (dispatch) => {
    testersAPI.updateTester(tester)
        .then(response => {
            dispatch(getTesters())
        })
}

export const deleteTester = (pn) => (dispatch) => {
    testersAPI.deleteTester(pn)
        .then(response => {
            dispatch(getTesters())
        })
}

export default testersReducer