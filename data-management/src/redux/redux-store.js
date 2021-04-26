import { applyMiddleware, combineReducers, createStore } from 'redux'
import testersReducer from './testers-reducer'
import ordersReducer from './orders-reducer'
import developersReducer from './developers-reducer'
import customersReducer from './customers-reducer'
import aythReducer from './auth-reducer'
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'


let reducers = combineReducers({
    testersPage: testersReducer,
    ordersPage: ordersReducer,
    developersPage: developersReducer,
    customersPage: customersReducer,
    auth: aythReducer,
    form: formReducer,
});

export let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;
