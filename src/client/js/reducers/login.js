import {LOGIN,REG,CLOSE} from '../constant/actionsType'

const initialState = {
    data:'',
    show:false
}
const loginReducer = (state = initialState,action) =>{
    switch (action.type){
        case LOGIN:
            return Object.assign({},state,{data:'login',show:action.show}
            )
        case REG:
            return Object.assign({},state,{data:'reg',show:action.show}
            )
        case CLOSE:
            return Object.assign({},state,{data:'close',show:action.show}
            )
        default: return state
    }
}
export default loginReducer
