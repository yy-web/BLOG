import {PAGE,PAGETOTAL} from '../constant/actionsType'

const initialState = {
    num:1,
    total:1
}
const pageReducers = (state = initialState,action) =>{
    switch (action.type){
        case PAGE:
            return Object.assign({},state,{num:action.num}
            )
        case PAGETOTAL:
            return Object.assign({},state,{total:action.total}
            )
        default: return state
    }
}
export default pageReducers
