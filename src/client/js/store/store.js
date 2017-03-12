import { createStore,combineReducers } from 'redux';
import loginReducer from '../reducers/login'
import tipsReducer from '../reducers/tips'
import loginStateReducer from '../reducers/loginStateReducer'
import listDataReducer from '../reducers/listData'

const stores = combineReducers ({
    login:loginReducer,
    tips:tipsReducer,
    loginState:loginStateReducer,
    listData:listDataReducer
})
export default stores;
