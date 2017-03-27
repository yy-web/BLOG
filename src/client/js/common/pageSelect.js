import { center } from "./common";
import { tips } from "../actions/tips";
import listData from '../actions/listData';
import * as pageActions from '../actions/page';
export function pageSelect(num) {

    return function(dispatch){
      //  center("tips");
        dispatch(tips("tipShow","请稍等..."));
        dispatch(pageActions.pagination(num));
        fetch('/list',{
            method:"POST",
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify({"num":num}),
            credentials: 'include', //携带cookie
        }).then(function (res) {
            return res.json();
        }).then(function(result){
            dispatch(listData(result.data));
            dispatch(tips("tipShow",""));
        })

    }
}
