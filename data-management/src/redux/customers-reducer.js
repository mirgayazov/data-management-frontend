const SET_CUSTOMERS = "SET_CUSTOMERS"
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"

let initialState = {
    customers: [],
    isFetching: true,
}

const customersReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case SET_CUSTOMERS:
            return {
                ...state,
                customers: action.customers
            }
        default:
            return state;
    }
}

export const setCustomers = (customers) => {
    debugger
    return {
        type: SET_CUSTOMERS,
        customers: customers,
    }
}

export const toggleIsFetching = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching: isFetching,
    }
}

export default customersReducer