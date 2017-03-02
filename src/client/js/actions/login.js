import * as loginbox from '../constant/actionsType';


export const loginBox = (type,message) =>{
    switch (type){
        case 'login':
            return{
                type:loginbox.LOGIN
            }
        case 'reg':
            return{
                type:loginbox.REG,
                message
            }
        case 'close':
            return{
                type:loginbox.CLOSE,
                message
            }
    }
}


