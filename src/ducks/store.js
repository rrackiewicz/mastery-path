import { createStore } from 'redux'
import reducer from './reducer' 
import { composeWithDevTools } from 'redux-devtools-extension'
//may end up having multiple reducers so will have to use combineReducers

let store = createStore(reducer, composeWithDevTools())

export default store;