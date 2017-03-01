import { center } from './common'
export function Submit(dispatch,url,Data) {
    console.log(url,Data)
    console.log(JSON.stringify(Data))
    fetch(url,{
        method:'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(Data)
    }).then(function (res) {
        return res.json()
    }).then(function(data){
        console.log(data)
        dispatch(data.message)
        center('tips')
    })
}