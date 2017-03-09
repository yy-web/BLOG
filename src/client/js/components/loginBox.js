import React from 'react'
import {render} from 'react-dom'

import {Submit} from '../common/fetch'
class LoginBox extends React.Component {
    constructor(props) {
        super(props)
        this.userName;
        this.password;
        this.CheckPassword;
        this.loginAction = this.props.loginAction
        this.SubmitAction = this.props.SubmitAction
    }

    close(){
        this.loginAction.loginBox('close');
        $('#locking').css('display','none')
    }
    regSubmit(){
        // const data="userName="+userName+"&password="+password;
        const data={
            "userName":this.userName.value,
            "password":this.password.value
        }
        if(this.userName.value == ''){
            this.loginAction.loginBox('reg','用户名不能为空');
            this.userName.focus()
            return
        }
        if(this.password.value == ''){
            this.loginAction.loginBox('reg','密码不能为空');
            this.password.focus()
            return
        }
        if(this.password.value !== this.CheckPassword.value){
            this.loginAction.loginBox('reg','两次输入密码不一致');
            this.CheckPassword.focus()
            return
        }
        this.SubmitAction('regSubmit','/reg',data)
        $('#locking').css('display','none')
    }
    LoginSubmit(){
        const data={
            "userName":this.userName.value,
            "password":this.password.value
        }
        this.SubmitAction('loginSubmit','/login',data)
      //  Submit(this.loginAction.login,'/login',data)
        $('#locking').css('display','none')
    }

    render() {
        var text;
        var input;
        var action;
        const { data } = this.props;
        if(data.data == 'login'){
            text = '登录';
            input = <input type="button" onClick={()=>{this.LoginSubmit()}} className="btn" defaultValue="登录" />
            action = '/login'
        }else if(data.data == 'reg'){
            text = '注册';
            input = <input type="button" onClick={()=>{this.regSubmit()}}  className="btn" defaultValue="注册" />
            action = '/reg'
        }
        return (

            <div className="loginBox" id='loginBox' style={{display: data.bool ? 'block' : 'none'}}>
                <h1>欢迎{text}</h1>
                <form id="loginForm"  action={action} method="post">
                    <span className="close" onClick={()=>{this.close()}}>x</span>
                    <div className="item">
                        <div className="name">用户名：</div>
                        <div className="inputDiv">
                            <input type="text" ref={el =>{this.userName=el}} name="userName" />
                        </div>
                    </div>
                    <div className="item">
                        <div className="name">密码：</div>
                        <div className="inputDiv">
                            <input type="password" ref={el =>{this.password=el}} name="password"/>
                        </div>
                    </div>
                    <div className="item" style={{display: data.data == 'login' ? 'none' : 'block'}}>
                        <div className="name">确认密码：</div>
                        <div className="inputDiv">
                            <input type="password" ref={el =>{this.CheckPassword=el}}  name="CheckPassword"/>
                        </div>
                    </div>
                    <div style={{'textAlign':'center'}}>
                        {input}
                    </div>

                </form>
            </div>
        )
    }


}


export default LoginBox;
