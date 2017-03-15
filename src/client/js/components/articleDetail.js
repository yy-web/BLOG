import React from 'react'
import Comment_box from './comment_box'


import { Provider, connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tipsActions from '../actions/tips';
import * as loginStateActions from '../actions/loginState';
import SubmitAction from '../actions/Submit';

class Adetaile extends React.Component{
    constructor(props) {
        super(props);
        this.content ;
        // 初始状态
        this.state = {
            Adetaile:{},
        };
    }
    commentSubmit(){
        const user = this.props.loginState.user;
        const commentData{
            content:this.content.value,
            user:user,
        }
        this.props.SubmitAction('commentSubmit','/comment',commentData)
    }
    componentDidMount(){
        const _this = this;
        const url = window.location.href;
        console.log(typeof url)
        const id = url.split('?id=')[1];
        fetch('/articleDetail',{
          method:"POST",
          headers: {"Content-Type":"application/json"},
          body:JSON.stringify({id:id}),
        }).then(function(res){
          return res.json()
        }).then(function(result){
          _this.setState({
              Adetaile:result.Adetaile
          })
        })
    }

    render(){
        return(
            <div className="Adetaile content">
                <div style={{minHeight:'320px'}}>
                    <h1 className="Atitle">{this.state.Adetaile.title}</h1>
                    <div className="Acontent">
                        {this.state.Adetaile.content}
                    </div>
                    <div className="a_mes">
                        <ul>
                            <li><span className="info">作者：</span><span> {this.state.Adetaile.user} </span></li>
                            <li><span className="info">发表时间：</span><span> {this.state.Adetaile.date} </span></li>
                            <li><span className="info">分类：</span><span> {this.state.Adetaile.classify} </span></li>
                            <li><span className="info">阅读量：</span><span> {this.state.Adetaile.times} </span></li>
                        </ul>
                    </div>
                </div>
                <div className="comment_mes">
                    <h1 className="title">评论区：</h1>
                    <Comment_box />
                </div>
                <div className="comment">
                    <h1 className="title">发表评论</h1>
                    <div className="commentForm">
                        <from>
                            <textarea name="content" ref={el =>{this.content=el}}  id="" cols="30" rows="10"></textarea>
                            <input type="button" onClick={}  value="发表评论" className="btn"/>
                        </from>
                    </div>
                </div>
            </div>
        )
        }
    }
    // 声明 connect 连接
    // 将 redux 中的 state传给 App
    const mapStateToProps = (state) => {
        return{
            loginState:state.loginState,
        }
    }

    const mapDispatchToProps = (dispatch) =>{
        return{
            SubmitAction : bindActionCreators(SubmitAction,dispatch)
        }
    }

    //声明 connect 连接
    Adetaile = connect(mapStateToProps,mapDispatchToProps)(Adetaile);






export default Adetaile ;
