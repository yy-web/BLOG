import React from 'react'
import {render} from 'react-dom'
import {Modal,FormGroup,Row,Col,Form ,ControlLabel,FormControl } from 'react-bootstrap'
import {Submit} from '../common/fetch'
class LoginBox extends React.Component {
    constructor(props) {
        super(props)
        this.userName;
        this.password;
        this.CheckPassword;
        this.loginAction = this.props.loginAction;
        this.alertTips = this.props.alertTips;
        this.SubmitAction = this.props.SubmitAction;
    }

    close(){
        this.loginAction.loginBox('close',false);
    }
    regSubmit(){
        // const data="userName="+userName+"&password="+password;

        const userIcon = document.getElementById('userIcon');
        if(this.userName.value == ''){
            this.alertTips('用户名不能为空');
            this.userName.focus()
            return
        }
        if(this.password.value == ''){
            this.alertTips('密码不能为空');
            this.password.focus()
            return
        }
        if(this.password.value !== this.CheckPassword.value){
            this.alertTips('两次输入密码不一致');
            this.CheckPassword.focus()
            return
        }
        if(userIcon.value == ''){
            this.alertTips('请上传图片');
            return
        }

        let data = new FormData()
        data.append('userName', this.userName.value)
        data.append('password', this.password.value)
        data.append('userIcon', userIcon.files[0])
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
        const { loginbox } = this.props;
        if(loginbox.data == 'login'){
            text = '登录';
            input = <input type="button" onClick={()=>{this.LoginSubmit()}} className="btn btn-primary" defaultValue="登录" />
            action = '/login'
        }else if(loginbox.data == 'reg'){
            text = '注册';
            input = <input type="button" onClick={()=>{this.regSubmit()}}  className="btn btn-primary" defaultValue="注册" />
            action = '/reg'
        }
        return (
            <Modal show={loginbox.show} onHide={()=>{this.close()}}>
                <Modal.Header closeButton>
                    <Modal.Title>{text}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal id="loginForm">
                        <FormGroup bsClass="row form-group" controlId="username">
                          <Col componentClass={ControlLabel} sm={4}>
                            用户名：
                          </Col>
                          <Col sm={6}>
                            <FormControl type="text" inputRef={el => { this.userName = el; }} name="userName" />
                          </Col>
                        </FormGroup>
                        <FormGroup bsClass="row form-group" controlId="password">
                          <Col componentClass={ControlLabel} sm={4}>
                            密码：
                          </Col>
                          <Col sm={6}>
                            <FormControl  type="password"  inputRef={el =>{this.password = el}} name="password" />
                          </Col>
                        </FormGroup>
                        <div style={{display: loginbox.data == 'login' ? 'none' : 'block'}}>
                            <FormGroup bsClass="row form-group" controlId="check_password">
                              <Col componentClass={ControlLabel} sm={4}>
                                确认密码：
                              </Col>
                              <Col sm={6}>
                                <FormControl  type="password"  inputRef={el =>{this.CheckPassword=el}} name="CheckPassword" id="check_password"/>
                              </Col>
                            </FormGroup>
                            <FormGroup controlId="userIcon">
                                <Col componentClass={ControlLabel} sm={4}>
                                    上传头像：
                                </Col>
                                <Col sm={6}>
                                    <FormControl type="file"  name='icon' id="userIcon" />
                                </Col>
                            </FormGroup>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <div style={{'textAlign':'center'}}>
                        {input}
                    </div>
                </Modal.Footer>
            </Modal>
        )
    }


}


export default LoginBox;
