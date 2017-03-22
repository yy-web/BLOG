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
                <form>
                    <div className="form-group row">
                      <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">文章标题：</label>
                      <div className="col-2">
                        <input ref={el => {this.title = el}} className="input form-control" id="inputEmail3" name='title' type="text" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">文章内容：</label>
                      <div className="col-sm-10">
                          <textarea ref={el => {this.content = el}} className="form-control" id="inputPassword3" name="" id="" cols="30" rows="10"></textarea>
                      </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="exampleInputFile" className="col-sm-2 col-form-label">上传图片：</label>
                        <div className="col-sm-10">
                            <input type="file" className="form-control-file" id="exampleInputFile" aria-describedby="fileHelp" />
                        </div>

                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">文章分类：</label>
                      <div className="col-sm-10">
                          <select className="custom-select">
                              <option selected>请选择---</option>
                              <option defaultValue="1">One</option>
                              <option defaultValue="2">Two</option>
                              <option defaultValue="3">Three</option>
                              <option defaultValue="4">其他</option>
                          </select>
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="offset-sm-2 col-sm-10">
                        <input type="button" onClick={() => {this.publishSubmit()}} value="发表" className="btn btn-outline-info  "/>
                      </div>
                    </div>
                </form>
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
