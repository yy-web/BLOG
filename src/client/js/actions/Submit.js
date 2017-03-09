import * as submit from '../constant/actionsType';
import { Submit } from '../common/fetch'
const SubmitAction = (type,url,data) =>{
    switch (type){
        case 'loginSubmit':
            return Submit(url,data)
        case 'regSubmit':
            return Submit(url,data)
        case 'logoutSubmit':
            return Submit(url,data)
        case 'publishSubmit':
            return Submit(url,data)
    }
};
export default SubmitAction
