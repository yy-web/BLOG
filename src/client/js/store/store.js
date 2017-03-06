import { createStore,combineReducers } from 'redux';
import loginReducer from '../reducers/login'
import tipsReducer from '../reducers/tips'
import loginStateReducer from '../reducers/loginStateReducer'

const stores = combineReducers ({
    login:loginReducer,
    tips:tipsReducer,
    loginState:loginStateReducer
})
export default stores;
