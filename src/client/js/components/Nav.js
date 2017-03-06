import React from 'react';
import ReactDOM from 'react-dom';
import {IndexLink,Link} from 'react-router';

import LoginBox from './loginBox';
import Tips from './tips';

/*import "../../css/loginBox.css";*/
import { center } from '../../js/common/common';

import { Provider, connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loginActions from '../actions/login';
import * as tipsActions from '../actions/tips';

class Nav extends React.Component{
    login(){
        this.props.loginAction.loginBox('login')
        center('loginBox')
    }
    reg(){
        this.props.loginAction.loginBox('reg');
        center('loginBox')
    }
    componentDidMount(){
        
    }

    render(){
        console.log('tips',this.props.tips.mes )
        console.log('login',this.props.login)
        return(
            <div className="nav_wrap">
                <div className="nav content">
                    <IndexLink to="/" activeClassName="select">首1页</IndexLink>
                    <Link to="/list" activeClassName="select">文章列表</Link>
                    <Link to="/publish" activeClassName="select">发布文章</Link>
                    <div className="welcome">
                        <span>欢迎您访问,请</span>
                        <a onClick={ () => {this.login()}}>登录</a>
                        <span>或</span>
                        <a onClick={() =>{this.reg()}}>注册</a>
                    </div>
                    <LoginBox loginAction={this.props.loginAction} data={this.props.login}/>
                    <Tips mes={this.props.tips.mes}/>
                </div>
                <div id="locking"></div>
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
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        loginAction : bindActionCreators(loginActions,dispatch),
        tipsActions : bindActionCreators(tipsActions,dispatch)
    }
}

//声明 connect 连接
Nav = connect(mapStateToProps,mapDispatchToProps)(Nav);


export default Nav;
