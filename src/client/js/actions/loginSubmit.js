import * as submit from '../constant/actionsType';
import { Submit } from '../common/fetch'
export const loginBox = (type,mes) =>{
    switch (type){
        case 'loginSubmit':
            return{
                Submit()
            };
        case 'regSubmit':
            return{
                type:submit.REGSUBMIT,
            };
        case 'logoutSubmit':
            return{
                type:submit.LOGOUTSUBMIT,
            };
    }
};
