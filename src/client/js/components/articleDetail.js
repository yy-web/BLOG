import React from 'react'
import Comment_box from './comment_box'
import {Form,FormGroup,Col,FormControl,FieldGroup,ControlLabel,Button} from 'react-bootstrap';

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

        let comment_list = [];

        const { comment } = this.props;
        comment.commentData.map(function(item,index){
            comment_list.push(<Comment_box commentData={item} key={index} />)
        })
        if(comment.commentData.length == 0){
            comment_list = [];
            comment_list.push(<div key='list' style={{fontSize:'28px',textAlign:'center',margin: '80px 0'}}>暂无评论</div>)
        }

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
                    <h3>评论区：</h3>
                    {comment_list}
                </div>
                <div className="comment">
                    <Form>
                        <FormGroup controlId="formControlsTextarea">
                            <ControlLabel><h3>发表评论</h3></ControlLabel>
                            <FormControl componentClass="textarea" inputRef={el => {this.content = el}} placeholder="登录后才能评论.." />
                        </FormGroup>
                        <FormGroup>
                            <Col sm={2} smOffset = {6}>
                                <Button onClick={() => {this.commentSubmit()}} type="button"  bsClass="btn btnStyle" bsStyle="info">发表</Button>
                            </Col>
                        </FormGroup>
                    </Form>
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
// Adetaile.propTypes = {
//     item:React.PropTypes.object.isRequired
// }

export default Adetaile ;
