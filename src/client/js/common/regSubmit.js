import { tips } from "../actions/tips";
import alertTips from "../actions/showTipsAction";
import { loginBox } from "../actions/loginBox";
import { loginStates } from "../actions/loginState";
export function regSubmit(url,Data,logout) {

    return function(dispatch){
        dispatch(alertTips('正在提交...'))
        fetch(url,{
            method:"POST",
            // headers: {"Content-Type":"application/json"},
            body: Data,
            credentials: 'include', //携带cookie
        }).then(function (res) {
            return res.json();
        }).then(function(data){
            dispatch(alertTips(data.mes))
            if(data.code == 200){
                document.getElementById("loginForm").reset();
                dispatch(loginBox('close',false))
            }
        })
    }
}
