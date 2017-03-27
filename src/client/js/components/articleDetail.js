import React from 'react'
import Comment_box from './comment_box'


import { Provider, connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tipsActions from '../actions/tips';
import * as loginStateActions from '../actions/loginState';
import SubmitAction from '../actions/Submit';
import comment from '../actions/comment';

class Adetaile extends React.Component{
    constructor(props) {
        super(props);
        this.content ;
        this.item = this.props.location.state.item
    }
    commentSubmit(){
        const user = this.props.loginState.user;
        const url = window.location.href;
        const id = url.split('?id=')[1];
        const commentData = {
            "content":this.content.value,
            "user":user,
            'aId':id,
        }
        this.props.SubmitAction('commentSubmit','/comment',commentData)
    }
    componentDidMount(){
        const _this = this;
        const url = window.location.href;
        const id = url.split('?id=')[1];
        fetch('/commentData',{
          method:"POST",
          headers: {"Content-Type":"application/json"},
          body:JSON.stringify({aId:id}),
        }).then(function(res){
            return res.json()
        }).then(function(result){
            _this.props.commentAction(result.commentData)
        })
    }

    render(){

        console.log('00',this.props.comment);
        let comment_list = [];

        const { comment } = this.props;
        comment.commentData.map(function(item,index){
            comment_list.push(<Comment_box commentData={item} key={index} />)
        })
    if(comment.commentData.length == 0){
        comment_list = [];
        comment_list.push(<div key='list' style={{fontSize:'28px',textAlign:'center',margin: '80px 0'}}>暂无评论</div>)
    }
        // if (comment.commentData !=undefined) {
        //     console.log('11',comment.commentData.length)
        //     for(let i = 0 ; i < comment.commentData.length; i++){
        //         comment_list.push(<Comment_box commentData={comment.commentData[i]} key={i} />)
        //     }
        // }
        return(
            <div className="Adetaile container">
                <div style={{minHeight:'320px'}}>
                    <h1 className="Atitle">{this.item.title}</h1>
                    <div className="Acontent">
                        {this.item.content}
                    </div>
                    <div className="a_mes">
                        <ul>
                            <li><span className="info">作者：</span><span> {this.item.user} </span></li>
                            <li><span className="info">发表时间：</span><span> {this.item.date} </span></li>
                            <li><span className="info">分类：</span><span> {this.item.classify} </span></li>
                            <li><span className="info">阅读量：</span><span> {this.item.times} </span></li>
                        </ul>
                    </div>
                </div>
                <div className="comment_mes">
                    <h1 className="title">评论区：</h1>
                    {comment_list}
                </div>
                <div className="comment">
                    <h1 className="title">发表评论</h1>
                    <div className="commentForm">
                        <from>
                            <textarea name="content" ref={el =>{this.content=el}}  id="" cols="30" rows="10"></textarea>
                            <input type="button"  onClick={()=>{this.commentSubmit()}} value="发表评论" className="btn"/>
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
            comment:state.commentData,
        }
    }

    const mapDispatchToProps = (dispatch) =>{
        return{
            SubmitAction : bindActionCreators(SubmitAction,dispatch),
            commentAction : bindActionCreators(comment,dispatch)
        }
    }

    //声明 connect 连接
    Adetaile = connect(mapStateToProps,mapDispatchToProps)(Adetaile);






export default Adetaile ;
