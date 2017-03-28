import { tips } from "../actions/tips";
export function showTips(mes) {

    return function(dispatch){
        dispatch(tips("tipShow",mes))
        const tip = document.getElementById('tips');
        tip.style.display = "block";
        const start = setTimeout(function(){
            tip.className = 'tipActive';
            clearTimeout(start)
        },150)
        const cancel = setTimeout(function(){
            tip.style.display = 'none';
            dispatch(tips("tipHide",""))
            tip.className =  '';
            clearTimeout(cancel)
        },1000)
    }
}
