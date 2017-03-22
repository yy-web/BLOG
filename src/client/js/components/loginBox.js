import React from 'react'
import {render} from 'react-dom'
import {Modal,FormGroup,Row,Col }
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
    }
    LoginSubmit(){
        const data={
            "userName":this.userName.value,
            "password":this.password.value
        }
        this.SubmitAction('loginSubmit','/login',data)
    }

    render() {
        var text;
        var input;
        var action;
        const { data } = this.props;
        if(data.data == 'login'){
            text = '登录';
            input = <input type="button" onClick={()=>{this.LoginSubmit()}} className="btn btn-primary" defaultValue="登录" />
            action = '/login'
        }else if(data.data == 'reg'){
            text = '注册';
            input = <input type="button" onClick={()=>{this.regSubmit()}}  className="btn btn-primary" defaultValue="注册" />
            action = '/reg'
        }
        return (
            <div className="modal fade" id="loginModal" data-backdrop='static' tabIndex="-1" role="dialog" aria-labelledby="loginTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="loginTitle">{text}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                          <form id="loginForm">
                              <div className="form-group row">
                                <label htmlFor="username" className="col-sm-4 col-form-label">用户名：</label>
                                <div className="col-6">
                                    <input type="text" ref={el =>{this.userName=el}} name="userName" id="username" className="input form-control" />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label htmlFor="password" className="col-sm-4 col-form-label">密码：</label>
                                <div className="col-6">
                                    <input type="password"  ref={el =>{this.password=el}} name="password" id="password" className="input form-control" />
                                </div>
                              </div>
                              <div className="form-group row" style={{display: data.data == 'login' ? 'none' : 'flex'}}>
                                <label htmlFor="check_password" className="col-sm-4 col-form-label">确认密码：</label>
                                <div className="col-6">
                                    <input type="password"  ref={el =>{this.CheckPassword=el}} name="CheckPassword" id="check_password" className="input form-control" />
                                </div>
                              </div>
                          </form>
                      </div>
                      <div className="modal-footer">
                          <div style={{'textAlign':'center'}}>
                              {input}
                          </div>
                      </div>
                    </div>
                </div>
            </div>

        )
    }


}


export default LoginBox;
