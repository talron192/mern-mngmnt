import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import sitesReducer from './reducers/sitesReducer';

const store = createStore(
    combineReducers({
        sitesReducer
    }),
    {},
    applyMiddleware(thunk)
)

export default store;