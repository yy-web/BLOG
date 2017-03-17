import {LISTDATA} from '../constant/actionsType'

const initialState = {
    data:[],
}
const listDataReducer = (state = initialState,action) =>{
    switch (action.type){
        case LISTDATA:
            return {
                data:action.data,
            }
        default: return state
    }
}
export default listDataReducer
