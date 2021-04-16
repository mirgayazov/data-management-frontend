import { combineReducers, createStore } from 'redux'
import testersReducer from './testers-reducer'
import ordersReducer from './orders-reducer'


let reducers = combineReducers({
    testersPage: testersReducer,
    ordersPage: ordersReducer,
});

export let store = createStore(reducers);
