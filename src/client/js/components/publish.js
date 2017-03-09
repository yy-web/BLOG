import React from 'react';
import ReactDOM from 'react-dom';
/*import "../../css/publish.css";*/

import { Provider, connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loginActions from '../actions/loginBox';
import * as tipsActions from '../actions/tips';
import * as loginStateActions from '../actions/loginState';
// import * as Submit from '../actions/Submit';
import SubmitAction from '../actions/Submit';

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
        console.log(user)
        const data = {
            title:this.title.value,
            content:this.content.value,
            classify:selectText,
        }

        console.log(selectText)
        this.props.SubmitAction('publishSubmit','/publish',data)
    }
    render(){
        return(

            <div className="content">
                <div className="publish">
                    <form action="/publish" >
                        <ul>
                            <li>
                                <span className="title">文章标题：</span><input ref={el => {this.title = el}} className="input" name='title' type="text" />
                            </li>
                            <li>
                                <span className="title">文章内容：</span><textarea ref={el => {this.content = el}} name="" id="" cols="30" rows="10"></textarea>
                            </li>
                            {/*<li>
                                <span className="title">上传图片：</span><input className="input" type="file" />
                            </li> */}
                            <li>
                                <span className="title">文章分类：</span>
                                <select name="" id="select">
                                    <option value="">12</option>
                                    <option value="">34</option>
                                    <option value="">56</option>
                                    <option value="">其他</option>
                                </select>
                            </li>
                        </ul>
                        <div className="btn_group">
                            <input type="button" onClick={() => {this.publishSubmit()}} value="发表" className="btn"/>
                        </div>

                    </form>

                </div>
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
        SubmitAction : bindActionCreators(SubmitAction,dispatch)
    }
}

//声明 connect 连接
Publish = connect(mapStateToProps,mapDispatchToProps)(Publish);
export default Publish ;
