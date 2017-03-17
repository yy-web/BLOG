import {COMMENT} from '../constant/actionsType'

const initialState = {
    commentData:[]
}
const commentReducers = (state = initialState,action) =>{
    switch (action.type){
        case COMMENT:
            return Object.assign({},state,{commentData:action.commentData}
            )
        default: return state
    }
}
export default commentReducers
