import React from 'react';
import ReactDOM from 'react-dom';
import { Navbar,NavItem,Nav } from 'react-bootstrap';
import {IndexLink,Link} from 'react-router';

import LoginBox from './loginBox';
import Tips from './tips';


/*import "../../css/loginBox.css";*/
import { center } from '../../js/common/common';

import { Provider, connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loginActions from '../actions/loginBox';
import * as tipsActions from '../actions/tips';
import alertTips from "../actions/showTipsAction";
import * as loginStateActions from '../actions/loginState';
import SubmitAction from '../actions/Submit';


class TopNav extends React.Component{
    login(){
        this.props.loginAction.loginBox('login',true)

    }
    reg(){
        this.props.loginAction.loginBox('reg',true);
    }
    logout(){
        this.props.SubmitAction('logoutSubmit','/logout',{},true);
    }

    componentDidMount(){
        center('tips')
    }
    render(){
        const date = new Date().getTime();
        let hasUser;
        if(this.props.loginState.user){
            hasUser = <div><span>欢迎, </span><img id="icon" src={this.props.loginState.icon}/><span>{this.props.loginState.user} </span><a onClick={() =>{this.logout()}}>退出</a></div>
        }else{
            hasUser = <div className="noUser"><span onClick={ () => {this.login()}} >登录</span>&nbsp;|&nbsp;<span onClick={() =>{this.reg()}} >注册</span></div>
        }
        return(
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            {hasUser}
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <ul className="nav navbar-nav navbar-right">
                            <li><IndexLink  to="/" activeClassName="active">首页</IndexLink></li>
                            <li><Link  to="/list" activeClassName="active">文章列表</Link></li>
                            <li><Link  to="/publish" activeClassName="active">发表文章</Link></li>
                        </ul>
                    </Navbar.Collapse>
                    <LoginBox  alertTips = {this.props.alertTips} loginAction={this.props.loginAction} SubmitAction={this.props.SubmitAction} loginbox={this.props.login}/>
                    <Tips mes={this.props.tips.mes}/>
                </Navbar>
            </div>

        )
    }
}
// 声明 connect 连接
// 将 redux 中的 state传给 App
const mapStateToProps = (state) => {
    return{
        login:state.login,
        tips:state.tips,
        loginState:state.loginState,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        loginAction : bindActionCreators(loginActions,dispatch),
        tipsActions : bindActionCreators(tipsActions,dispatch),
        loginStateActions : bindActionCreators(loginStateActions,dispatch),
        SubmitAction : bindActionCreators(SubmitAction,dispatch),
        alertTips : bindActionCreators(alertTips,dispatch)
    }
}

//声明 connect 连接
TopNav = connect(mapStateToProps,mapDispatchToProps)(TopNav);


export default TopNav;
