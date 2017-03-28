import { center } from "./common";
import { tips } from "../actions/tips";
import alertTips from "../actions/showTipsAction";
import { loginBox } from "../actions/loginBox";
import { loginStates } from "../actions/loginState";
import  comment  from "../actions/comment";
export function Submit(url,Data,logout) {

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
            dispatch(loginStates("isLogin",data.user));
            if(logout){
                dispatch(loginStates("isLogout"))
            }

            dispatch(comment(data.commentData))
            if(data.code == 200){
              //  document.getElementById("loginForm").reset();
                dispatch(loginBox('close',false))


            }
        })
    }
}
