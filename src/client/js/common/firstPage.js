import { center } from "./common";
import { tips } from "../actions/tips";
import alertTips from "../actions/showTipsAction";
import listData from '../actions/listData';
import * as pageActions from '../actions/page';
export function firstPage(user) {
    let data = {
        'num':1
    };
    if(user){
        data[user] = user
    }
    return function(dispatch){
      //  center("tips");
        dispatch(alertTips("请稍等..."))
        fetch('/list',{
            method:"POST",
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify(data),
            credentials: 'include', //携带cookie
        }).then(function (res) {
            return res.json();
        }).then(function(result){
            const maxItem = Math.ceil(result.max / 6);
            dispatch(pageActions.pageTotal(maxItem))
            dispatch(listData(result.data));
            dispatch(pageActions.pagination(1));
            dispatch(alertTips(result.mes));
        })

    }
}
