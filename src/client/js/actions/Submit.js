import { Submit } from '../common/fetch'
import { publishFetch } from '../common/publishFetch'
const SubmitAction = (type,url,data,logout) =>{
    switch (type){
        case 'loginSubmit':
            return Submit(url,data,logout)
        case 'regSubmit':
            return Submit(url,data,logout)
        case 'logoutSubmit':
            return Submit(url,data,logout)
        case 'publishSubmit':
            return publishFetch(url,data)
        case 'commentSubmit':
            return Submit(url,data,logout)
    }
};
export default SubmitAction
