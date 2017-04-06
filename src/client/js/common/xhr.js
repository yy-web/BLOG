import promise from 'bluebird';

export function xhr(url,_data) {
    return new promise(function(resolve, reject){
        let xhr = new XMLHttpRequest();
        if(xhr){
            console.log('xhr',123);
            console.log('_data',_data);
            xhr.onreadystatechange = (e) =>{
                console.log('onreadystatechange',xhr.readyState);
                if(xhr.readyState == 4){
                    console.log('xhr.status',xhr.status);
                    if(xhr.status == 200){
                        const str = xhr.responseText
                        resolve(str)
                        console.log('xhr',456);
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
