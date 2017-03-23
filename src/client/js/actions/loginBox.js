import * as loginbox from '../constant/actionsType';


export const loginBox = (type,show) =>{
    switch (type){
        case 'login':
            return{
                type:loginbox.LOGIN,
                show
            };
        case 'reg':
            return{
                type:loginbox.REG,
                show
            };
        case 'close':
            return{
                type:loginbox.CLOSE,
                show
            };
    }
};
