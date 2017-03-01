import loginStore from '../store/login'

import {login,reg} from '../actions/login'

let store = loginStore();

let unsubscribe = store.subscribe(() =>
    console.log(store.getState())
)

store.dispatch(login())
store.dispatch(reg())

