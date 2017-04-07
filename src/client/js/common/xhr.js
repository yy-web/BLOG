import promise from 'bluebird';

export function xhr(url,_data) {
    return new promise(function(resolve, reject){
        let xhr = new XMLHttpRequest();
        if(xhr){
            xhr.onreadystatechange = (e) =>{
                console.log('onreadystatechange',xhr.readyState);
                if(xhr.readyState == 4){
                    console.log('xhr.status',xhr.status);
                    if(xhr.status == 200){
                        document.getElementById('publishForm').reset();
                        const str = xhr.responseText
                        resolve(str)
                    }else{
                        reject(xhr.responseText)
                    }
                }
            }
            xhr.open('post',url,true);
            xhr.send(_data);
        }
    })
}
