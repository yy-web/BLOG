import { createStore,combineReducers } from 'redux';
import loginReducer from '../reducers/login'
import tipsReducer from '../reducers/tips'
import loginStateReducer from '../reducers/loginStateReducer'
import listDataReducer from '../reducers/listData'
import commentReducers from '../reducers/commentReducers'

const stores = combineReducers ({
    login:loginReducer,
    tips:tipsReducer,
    loginState:loginStateReducer,
    listData:listDataReducer,
    commentData:commentReducers,
})
export default stores;
