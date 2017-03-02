import { createStore,combineReducers } from 'redux';
import loginReducer from '../reducers/login'
import tipsReducer from '../reducers/tips'

const stores = combineReducers ({
    login:loginReducer,
    tips:tipsReducer
})
export default stores;
