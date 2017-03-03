import * as loginbox from '../constant/actionsType';


export const loginBox = (type,mes) =>{
    switch (type){
        case 'login':
            return{
                type:loginbox.LOGIN
            }
        case 'reg':
            return{
                type:loginbox.REG,
                mes
            }
        case 'close':
            return{
                type:loginbox.CLOSE,
                mes
            }
    }
}


