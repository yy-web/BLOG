import { TIPSHIDE,TIPSSHOW } from '../constant/actionsType'
const initialState ={
    mes:''
}

const tipsReducer = (state=initialState,action)  =>{
    switch (action.type){
        case TIPSHIDE:
            return{
                mes:''
            }
        case TIPSSHOW:
            return Object.assign({},state,{mes:action.mes})
        
        default: return state
    }

}
export default tipsReducer;