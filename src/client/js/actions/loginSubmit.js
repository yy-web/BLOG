import * as submit from '../constant/actionsType';
import { Submit } from '../common/fetch'
export const loginSubmits = (type,url,data) =>{
    switch (type){
        case 'loginSubmit':
            return Submit(url,data)

        case 'regSubmit':
            return Submit(url,data)
        case 'logoutSubmit':
            return{
                type:submit.LOGOUTSUBMIT,
            }
    }
};
