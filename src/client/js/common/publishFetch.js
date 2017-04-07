import { tips } from "../actions/tips";
import alertTips from "../actions/showTipsAction";
// import { xhr } from "../common/xhr";
export function publishFetch(url,Data) {

    return function(dispatch){
        dispatch(alertTips('正在提交...'))
        fetch(url,{
            method:"POST",
            // headers: {"Content-Type":"multipart/form-data"},
            body: Data,
            credentials: 'include', //携带cookie
        }).then(function (res) {
            return res.json();
        }).then(function(data){
            dispatch(alertTips(data.mes))
            if(data.code == 200){
                document.getElementById('publishForm').reset();
            }
        })
        // xhr(url,Data).then(function(result){
        //     return JSON.parse(result)
        // }).then(function(data){
        //     dispatch(alertTips(data.mes))
        //     console.log('1',data);
        //     console.log('2',typeof data);
        // })
    }
}
