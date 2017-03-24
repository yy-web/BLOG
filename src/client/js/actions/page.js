import * as paginationAction from '../constant/actionsType'

export const pagination = (num) =>{
    return{
        type:paginationAction.PAGE,
        num
    }
}
export const pageTotal = (total) =>{
    return{
        type:paginationAction.PAGETOTAL,
        total
    }
}
