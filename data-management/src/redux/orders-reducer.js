import { developersAPI, ordersAPI, testersAPI } from '../api/api'
import { getCustomers } from './customers-reducer'
import { setDevelopers } from './developers-reducer'
import { setTesters } from './testers-reducer'

const SET_ORDERS = 'SET_ORDERS'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'

let initialState = {
    orders: [],
    isFetching: true,
}

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case SET_ORDERS:
            return {
                ...state,
                orders: action.orders.reverse()
            }
        default:
            return state;
    }
}

export const setOrders = (orders) => {
    return {
        type: SET_ORDERS,
        orders: orders,
    }
}

export const toggleIsFetching = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching: isFetching,
    }
}

export const getOrders = () => (dispatch) => {
    dispatch(toggleIsFetching(true));
    ordersAPI.getOrders()
        .then(orders => {
            dispatch(toggleIsFetching(false));
            dispatch(setOrders(orders));
        })
}

export const createNewOrder = (order) => (dispatch) => {
    ordersAPI.createNewOrder(order)
        .then(response => {
            dispatch(getCustomers())
            dispatch(getOrders())
        })
}

export const updateOrder = (order) => (dispatch) => {
    debugger
    ordersAPI.updateOrder(order)
        .then(response => {
            dispatch(getOrders())
        })
}

export const deleteOrder = (pn) => (dispatch) => {
    ordersAPI.deleteOrder(pn)
        .then(response => {
            dispatch(getOrders())
        })
}

export const appointDeveloper = (schema, setSortedDevs) => (dispatch) => {
    ordersAPI.appointDeveloper(schema)
        .then(response => {
            dispatch(getOrders())
            developersAPI.getDevelopers()
                .then(data => {
                    setSortedDevs(data.reverse())
                    dispatch(setDevelopers(data))
                })
        })
}

export const appointTester = (schema, setSortedTesters) => (dispatch) => {
    ordersAPI.appointTester(schema)
        .then(response => {
            dispatch(getOrders())
            testersAPI.getTesters()
                .then(data => {
                    setSortedTesters(data.reverse())
                    dispatch(setTesters(data))
                })
        })
}

export const removeDeveloperFromOrder = (schema, setSortedDevs) => (dispatch) => {
    ordersAPI.removeDeveloperFromOrder(schema)
        .then(response => {
            dispatch(getOrders())
            developersAPI.getDevelopers()
                .then(data => {
                    setSortedDevs(data.reverse())
                    dispatch(setDevelopers(data))
                })
        })
}

export const removeTesterFromOrder = (schema, setSortedTesters) => (dispatch) => {
    ordersAPI.removeTesterFromOrder(schema)
        .then(response => {
            dispatch(getOrders())
            testersAPI.getTesters()
                .then(data => {
                    setSortedTesters(data.reverse())
                    dispatch(setTesters(data))
                })
        })
}


export default ordersReducer