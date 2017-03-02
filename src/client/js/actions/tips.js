import * as status from '../constant/actionsType';


export const tips= (type,mes) =>{
    switch (type){
        case 'tipHide':
            return{
                type:status.TIPSHIDE,
                mes:''
            }
        case 'tipShow':
            return{
                type:status.TIPSSHOW,
                mes
            }
    }
}



