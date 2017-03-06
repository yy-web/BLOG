import {ISLOGIN,ISLOGOUT} from '../constant/actionsType'

const initialState = {
    user:''
}
const loginStateReducer = (state = initialState,action) =>{
    switch (action.type){
        case ISLOGOUT:
            return Object.assign({},state,{user:''}
            )
        case ISLOGIN:
            return Object.assign({},state,{user:action.user}
            )
        default: return state
    }
}
export default loginStateReducer
