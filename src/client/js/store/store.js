import { createStore,combineReducers } from 'redux';
import loginReducer from '../reducers/login'
import tipsReducer from '../reducers/tips'
import loginStateReducer from '../reducers/loginStateReducer'
import listDataReducer from '../reducers/listData'
import commentReducers from '../reducers/commentReducers'
import pageReducers from '../reducers/pageReducers'

const stores = combineReducers ({
    login:loginReducer,
    tips:tipsReducer,
    loginState:loginStateReducer,
    listData:listDataReducer,
    commentData:commentReducers,
    pageNum:pageReducers,
})
export default stores;
