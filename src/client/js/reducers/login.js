import {LOGIN,REG,CLOSE} from '../constant/login'

const initialState = {
    data:'',
    bool:false
}

export default function login(state = initialState,action) {
    switch (action.type){
        case LOGIN:
            return {
                data:'login',
                bool:true
            }
        case REG:
            return Object.assign({},state,{message:action.message,data:'reg',bool:true}
            )
        case CLOSE:
            return Object.assign({},state,{message:action.message,data:'close',bool:false}
            )
        default: return state
    }
}