import React from 'react';
import ReactDOM from 'react-dom';
/*import "../../css/publish.css";*/

import { Provider, connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loginActions from '../actions/loginBox';
import * as tipsActions from '../actions/tips';
import * as loginStateActions from '../actions/loginState';
import alertTips from '../actions/showTipsAction';
// import * as Submit from '../actions/Submit';
import SubmitAction from '../actions/Submit';
import {Form,FormGroup,Col,FormControl,FieldGroup,ControlLabel,Button} from 'react-bootstrap';
class Publish extends React.Component {
    constructor(props) {
        super(props)
        this.title;
        this.content;
    }
    publishSubmit(){
        const select = document.getElementById('select');
        const selectText = select.selectedOptions[0].text;
        const user = this.props.loginState.user
        if(user == '' || user == undefined){
            this.props.alertTips('请先登录')
            return
        }else if(this.title.value == ''){
            this.props.alertTips('标题不能为空')
            return
        }else if(this.content.value == ''){
            this.props.alertTips('内容不能为空')
            return
        }
        const data = {
            user:user,
            title:this.title.value,
            content:this.content.value,
            classify:selectText,
        }

        this.props.SubmitAction('publishSubmit','/publish',data)
    }
    render(){
        return(
            <div className="container publish">
                <Form horizontal>
                    <FormGroup controlId="title">
                        <Col componentClass={ControlLabel} sm={2}>
                            文章标题：
                        </Col>
                        <Col sm={2}>
                            <FormControl inputRef={el => {this.title = el}} id="title" name='title' type="text" />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="content">
                        <Col componentClass={ControlLabel} sm={2}>
                            文章内容：
                        </Col>
                        <Col sm={10}>
                            <FormControl componentClass="textarea" inputRef={el => {this.content = el}} id="content" />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="InputFile">
                        <Col componentClass={ControlLabel} sm={2}>
                            上传图片：
                        </Col>
                        <Col sm={2}>
                            <FormControl type="file"  name='file' inputRef={el => {this.file = el}} id="InputFile" />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="select">
                        <Col componentClass={ControlLabel} sm={2}>
                            <ControlLabel>文章分类：</ControlLabel>
                        </Col>
                        <Col sm={3}>
                            <FormControl componentClass="select">
                                <option defaultValue="0">默认</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                                <option value="4">其他</option>
                            </FormControl>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="button">
                        <Col sm={2} smOffset = {6}>
                            <Button onClick={() => {this.publishSubmit()}} bsStyle="info" bsClass="btn btnStyle" type="button">发表</Button>
                        </Col>
                    </FormGroup>
                </Form>


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
        SubmitAction : bindActionCreators(SubmitAction,dispatch),
        alertTips : bindActionCreators(alertTips,dispatch)
    }
}

//声明 connect 连接
Publish = connect(mapStateToProps,mapDispatchToProps)(Publish);
export default Publish ;
