import React from 'react';
import ReactDOM from 'react-dom';
import {IndexLink,Link} from 'react-router';

import LoginBox from './loginBox'
import Tips from './tips'

/*import "../../css/loginBox.css";*/
import { center } from '../../js/common/common'

import { Provider, connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as loginActions from '../actions/login'

class Nav extends React.Component{
    login(){
        this.props.actions.login();
        center('loginBox')
    }
    reg(){
        this.props.actions.reg();
        center('loginBox')
    }
    
    
    render(){
        console.log('data',this.props.login)
        return(
            <div className="nav_wrap">
                <div className="nav content">
                    <IndexLink to="/" activeClassName="select">首页</IndexLink>
                    <Link to="/list" activeClassName="select">文章列表</Link>
                    <Link to="/publish" activeClassName="select">发布文章</Link>
                    <div className="welcome">
                        <span>欢迎您访问,请</span>
                        <a onClick={this.login.bind(this)}>登录</a>
                        <span>或</span>
                        <a onClick={this.reg.bind(this)}>注册</a>
                    </div>
                    <LoginBox actions={this.props.actions} data={this.props.login}/>
                    <Tips message={this.props.login.message}/>
                </div>

            </div>
        )
    }



}
// 声明 connect 连接
// 将 redux 中的 state传给 App
function mapStateToProps(state){
    return{
        login:state
    }
}

function mapDispatchToProps(dispatch){
    return{
        actions : bindActionCreators(loginActions,dispatch)
    }
}

//声明 connect 连接
Nav = connect(mapStateToProps,mapDispatchToProps)(Nav);


export default Nav;