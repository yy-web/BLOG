import {LOGIN,REG,CLOSE} from '../constant/actionsType'

const initialState = {
    data:'',
    bool:false
}
const loginReducer = (state = initialState,action) =>{
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
export default loginReducer
