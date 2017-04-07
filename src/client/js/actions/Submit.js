import { Submit } from '../common/fetch'
import { publishFetch } from '../common/publishFetch'
import { regSubmit } from '../common/regSubmit'
import { logoutSubmit } from '../common/logoutSubmit'
import { commentSubmit } from '../common/commentSubmit'
const SubmitAction = (type,url,data) =>{
    switch (type){
        case 'loginSubmit':
            return Submit(url,data)
        case 'regSubmit':
            return regSubmit(url,data)
        case 'logoutSubmit':
            return logoutSubmit(url,data)
        case 'publishSubmit':
            return publishFetch(url,data)
        case 'commentSubmit':
            return commentSubmit(url,data)
    }
};
export default SubmitAction
