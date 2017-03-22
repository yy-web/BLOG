import React from 'react';
import ReactDOM from 'react-dom';
import {IndexLink,Link} from 'react-router';

import LoginBox from './loginBox';
import Tips from './tips';


/*import "../../css/loginBox.css";*/
import { center } from '../../js/common/common';

import { Provider, connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loginActions from '../actions/loginBox';
import * as tipsActions from '../actions/tips';
import * as loginStateActions from '../actions/loginState';
import SubmitAction from '../actions/Submit';


class Nav extends React.Component{
    login(){
        this.props.loginAction.loginBox('login')
        center('loginBox')
    }
    reg(){
        this.props.loginAction.loginBox('reg');
        center('loginBox')
    }
    logout(){
        this.props.SubmitAction('logoutSubmit','/logout',{},true);
        center('loginBox')
    }
    componentDidMount(){

    }
    render(){
        const date = new Date().getTime();
        console.log('tips',this.props.tips.mes )
        return(
            // <div className="nav_wrap">
            //     <div className="nav content">
            //         <IndexLink to="/" activeClassName="select">首页</IndexLink>
            //         <Link to="/list" activeClassName="select">文章列表</Link>
            //         <Link to="/publish" activeClassName="select">发布文章</Link>
            //         <div className="welcome">
            //             <div style={{display:this.props.loginState.user ? 'none' : 'block' }}>
            //                 <span>欢迎您访问,请</span>
            //                 <a onClick={ () => {this.login()}}>登录</a>
            //                 <span>或</span>
            //                 <a onClick={() =>{this.reg()}}>注册</a>
            //             </div>
            //             <div style={{display:this.props.loginState.user ? 'block' : 'none' }}>
            //                 <span>欢迎,{this.props.loginState.user}</span>
            //                 <a onClick={() =>{this.logout()}}>退出</a>
            //             </div>
            //         </div>
            //         <LoginBox loginAction={this.props.loginAction} SubmitAction={this.props.SubmitAction} data={this.props.login}/>
            //         <Tips mes={this.props.tips.mes}/>
            //     </div>
            //     <div id="locking"></div>
            // </div>
        <nav className="navbar navbar-toggleable-md navbar-light">
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand" href="#">&nbsp;</a>
            <div className="container">
                <div className="collapse navbar-collapse " id="navbarColor02" style={{padding:'30px 0'}}>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                             <IndexLink className="nav-link" to="/" activeClassName="active">首页</IndexLink>
                        </li>
                        <li className="nav-item">
                              <Link className="nav-link"  to="/list" activeClassName="active">文章列表</Link>
                        </li>
                        <li className="nav-item">
                               <Link className="nav-link"  to="/publish" activeClassName="active">发布文章</Link>
                        </li>
                    </ul>
                    <span onClick={ () => {this.login()}} data-toggle="modal" data-target="#loginModal" className="nav-link">登录</span>
                    <span onClick={() =>{this.reg()}} data-toggle="modal"  data-target="#loginModal" className="nav-link">注册</span>
                    {/* <form className="form-inline">
                        <input className="form-control mr-sm-2" type="text" placeholder="Search"/>
                        <button className="btn btn-outline-secondary my-2 my-sm-0" type="submit">搜索</button>
                    </form> */}
                </div>
            </div>
            <LoginBox loginAction={this.props.loginAction} SubmitAction={this.props.SubmitAction} data={this.props.login}/>
            <Tips mes={this.props.tips.mes}/>
        </nav>
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
        SubmitAction : bindActionCreators(SubmitAction,dispatch)
    }
}

//声明 connect 连接
Nav = connect(mapStateToProps,mapDispatchToProps)(Nav);


export default Nav;
