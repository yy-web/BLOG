import { center } from './common';
import tips from '../actions/tips'
export function Submit(url,Data) {
    return function(dispatch){
        dispatch(tips('tipShow','正在提交');
        center('tips');
        console.log(url,Data);
        console.log(JSON.stringify(Data));
        fetch(url,{
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(Data)
        }).then(function (res) {
            return res.json();
        }).then(function(data){
            dispatch(tips('tipShow',data.mes)
            //dispatch(data.message,data.code,data.user);
            console.log('mes',data.message);
            // if(data.code == 200){
            //     document.getElementById('loginForm').reset();
            //
            //     $('#locking').hide();
            //
            //     var counter = setTimeout(function () {
            //         $('#tips').hide();
            //         clearTimeout(counter);
            //     },500);
            //
            // }
        });
    }
}
