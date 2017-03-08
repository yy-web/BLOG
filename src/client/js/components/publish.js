import React from 'react';
import ReactDOM from 'react-dom';
import {Submit} from '../common/fetch';
/*import "../../css/publish.css";*/

class Publish extends React.Component {
    constructor(props) {
        super(props)
        this.title;
        this.content;
        this.loginAction = this.props.loginAction
        this.loginSubmit = this.props.loginSubmit
    }
    publishSubmit(){
        const data = {
            title:this.title.value,
            content:this.content.value,
        }
        console.log(1)
        fetch('/publish',{
            method:"POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(data),
        }).then(function (res) {
            console.log(122)
            return res.json();
        }).then(function(data){
            dispatch(tips("tipShow",data.mes))
            dispatch(loginStates("isLogin",data.user))
            //dispatch(data.message,data.code,data.user);
            console.log("mes",data.mes)
            console.log("isLogin",data.user)
            if(data.code == 200){
                document.getElementById("loginForm").reset();
                dispatch(loginBox('close'))
                $("#locking").hide();
                // var counter = setTimeout(function () {
                //     $("#tips").hide();
                //     clearTimeout(counter);
                // },500);
            }
        })
        //Submit('/publish',data)
    }
    render(){
        return(
            <div className="content">
                <div className="publish">
                    <form action="/publish" >
                        <ul>
                            <li>
                                <span className="title">文章标题：</span><input ref={el => {this.title = el}} className="input" name='title' type="text" />
                            </li>
                            <li>
                                <span className="title">文章内容：</span><textarea ref={el => {this.content = el}} name="" id="" cols="30" rows="10"></textarea>
                            </li>
                            {/*<li>
                                <span className="title">上传图片：</span><input className="input" type="file" />
                            </li> */}
                            <li>
                                <span className="title">文章分类：</span>
                                <select name="" id="select">
                                    <option value="">12</option>
                                    <option value="">34</option>
                                    <option value="">56</option>
                                    <option value="">其他</option>
                                </select>
                            </li>
                        </ul>
                        <div className="btn_group">
                            <input type="button" onClick={() => {this.publishSubmit()}} value="发表" className="btn"/>
                        </div>

                    </form>

                </div>
            </div>

        )
    }

}

export default Publish ;
