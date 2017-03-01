import React from 'react'
import {render} from 'react-dom'

import {Submit} from '../common/fetch'
class LoginBox extends React.Component {
    close(){
        const { actions } = this.props;
        actions.close();
        $('#locking').css('display','none')
    }
    regSubmit(){
        const { actions } = this.props;
        const userName = this.refs.userName.value;
        const password = this.refs.password.value;
        const CheckPassword = this.refs.CheckPassword.value;
        // const data="userName="+userName+"&password="+password;
        const data={
           "userName":userName,
           "password":password
        }
        if(password !== CheckPassword){
            actions.reg('两次输入密码不一致');
            this.refs.CheckPassword.focus()
            return
        }
        Submit(actions.reg,'/reg',data)
        $('#locking').css('display','none')
    }

    render() {
        var text;
        var input;
        var action;
        const { data } = this.props;
        if(data.data == 'login'){
            text = '登录';
            input = <input type="button" className="btn" defaultValue="登录" />
            action = '/login'
        }else if(data.data == 'reg'){
            text = '注册';
            input = <input type="button" onClick={this.regSubmit.bind(this)} className="btn" defaultValue="注册" />
            action = '/reg'
        }
        console.log('close',typeof(data.data))
        return (

            <div className="loginBox" id='loginBox' style={{display: data.bool ? 'block' : 'none'}}>
                <h1>欢迎{text}</h1>
                <form id="loginForm"  action={action} method="post">
                    <span className="close" onClick={this.close.bind(this)}>x</span>
                    <div className="item">
                        <div className="name">用户名：</div>
                        <div className="inputDiv">
                            <input type="text" ref="userName" name="userName" />
                        </div>
                    </div>
                    <div className="item">
                        <div className="name">密码：</div>
                        <div className="inputDiv">
                            <input type="password" ref="password" name="password"/>
                        </div>
                    </div>
                    <div className="item" style={{display: data.data == 'login' ? 'none' : 'block'}}>
                        <div className="name">确认密码：</div>
                        <div className="inputDiv">
                            <input type="password" ref="CheckPassword"  name="CheckPassword"/>
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