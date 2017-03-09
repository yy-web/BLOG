import { center } from "./common";
import { tips } from "../actions/tips";
import { loginBox } from "../actions/loginBox";
import { loginStates } from "../actions/loginState";
export function Submit(url,Data) {

    return function(dispatch){
      //  center("tips");
        dispatch(tips("tipShow","正在提交"));
        console.log(url,Data);
        fetch(url,{
            method:"POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(Data),
        }).then(function (res) {
            return res.json();
        }).then(function(data){
            dispatch(tips("tipShow",data.mes))
            dispatch(loginStates("isLogin",data.user))
            //dispatch(data.message,data.code,data.user);
            console.log("mes",data.mes)
            console.log("isLogin",data.user)
            if(data.code == 200){
                document.getElementById("loginForm").reset();
                dispatch(loginBox('close'))
                $("#locking").hide();
                // var counter = setTimeout(function () {
                //     $("#tips").hide();
                //     clearTimeout(counter);
                // },500);
            }
        })
    }
}
