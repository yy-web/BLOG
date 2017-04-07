import { tips } from "../actions/tips";
import alertTips from "../actions/showTipsAction";
import { loginBox } from "../actions/loginBox";
import { loginStates } from "../actions/loginState";
export function logoutSubmit(url,Data,logout) {
    return function(dispatch){
        dispatch(alertTips('正在提交...'))
        fetch(url,{
            method:"POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(Data),
            credentials: 'include', //携带cookie
        }).then(function (res) {
            return res.json();
        }).then(function(data){
            dispatch(alertTips(data.mes))
            dispatch(loginStates("isLogout"))
        })
    }
}
