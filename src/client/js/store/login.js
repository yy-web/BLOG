import { createStore } from 'redux';
import loginReducer from '../reducers/login'

export default function loginStore(state) {
    return createStore(loginReducer,state)
}
