import { ordersAPI } from "../api/api"

const SET_ORDERS = "SET_ORDERS"
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"

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
            dispatch(getOrders())
        })
}

export const deleteOrder = (pn) => (dispatch) => {
    ordersAPI.deleteOrder(pn)
        .then(response => {
            dispatch(getOrders())
        })
}

export default ordersReducer