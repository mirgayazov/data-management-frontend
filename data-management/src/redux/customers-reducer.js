import { customersAPI } from '../api/api'

const SET_CUSTOMERS = 'SET_CUSTOMERS'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'

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
                customers: action.customers.reverse()
            }
        default:
            return state;
    }
}

export const setCustomers = (customers) => {
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

export const getCustomers = () => (dispatch) => {
    customersAPI.getCustomers()
        .then(customers => {
            dispatch(setCustomers(customers));
        })
}

export const createNewCustomer = (customer) => (dispatch) => {
    customersAPI.createNewСustomer(customer)
        .then(response => {
            dispatch(getCustomers())
        })
}

export const updateСustomer = (customer) => (dispatch) => {
    customersAPI.updateСustomer(customer)
        .then(response => {
            dispatch(getCustomers())
        })
}

export const deleteCustomer = (id) => (dispatch) => {
    customersAPI.deleteСustomer(id)
        .then(response => {
            dispatch(getCustomers())
        })
}

export default customersReducer