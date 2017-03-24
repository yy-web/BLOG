export function upload(url) {
    let data = new FormData(document.getElementById('upload'));
    let input = document.querySelector('#InputFile')
    data.append('file', input.files[0])
    return function(dispatch){
        console.log(url,data);
        fetch(url,{
            method:"POST",
            headers: {"Content-Type":"multipart/form-data"},
            body: data,
            credentials: 'include', //携带cookie
        }).then(function (res) {
            return res.json();
        }).then(function(data){

            //dispatch(comment(data.commentData))
            //dispatch(data.message,data.code,data.user);
        })
    }
}
