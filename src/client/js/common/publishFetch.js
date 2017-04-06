import { center } from "./common";
import { tips } from "../actions/tips";
import alertTips from "../actions/showTipsAction";
import { loginBox } from "../actions/loginBox";
import { xhr } from "../common/xhr";
export function publishFetch(url,Data) {

    return function(dispatch){
        dispatch(alertTips('正在提交...'))
        xhr(url,Data).then(function(result){
            return JSON.parse(result)
        }).then(function(data){
            dispatch(alertTips(data.mes))
            console.log('1',data);
            console.log('2',typeof data);
        })
        // fetch(url,{
        //     method:"POST",
        //     headers:{
        //         'Content-Type':'application/x-www-form-urlencoded',
        //     },
        //     body: Data,
        //     credentials: 'include', //携带cookie
        // }).then(function (res) {
        //     return res.json();
        // }).then(function(data){
        //     dispatch(alertTips(data.mes))
        //     if(data.code == 200){
        //         dispatch(loginBox('close',false))
        //     }
        // })
    }
}
