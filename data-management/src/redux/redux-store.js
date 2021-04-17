import { applyMiddleware, combineReducers, createStore } from 'redux'
import testersReducer from './testers-reducer'
import ordersReducer from './orders-reducer'
import developersReducer from './developers-reducer'
import customersReducer from './customers-reducer'
import thunkMiddleware from 'redux-thunk'


let reducers = combineReducers({
    testersPage: testersReducer,
    ordersPage: ordersReducer,
    developersPage: developersReducer,
    customersPage: customersReducer,
});

export let store = createStore(reducers, applyMiddleware(thunkMiddleware));

