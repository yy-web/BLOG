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
        dispatch(data.message,data.code,data.user)
        center('tips')
        console.log('mes',data.message)
        if(data.code == 200){
            document.getElementById('loginForm').reset()

            $('#locking').hide()

            var counter = setTimeout(function () {
                $('#tips').hide()
                clearTimeout(counter)
            },500)

        }
    })
}