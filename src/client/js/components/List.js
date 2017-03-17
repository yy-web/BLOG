import React from 'react';
import ReactDOM from 'react-dom';


import { Provider, connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import * as tipsActions from '../actions/tips';
import listData from '../actions/listData';
import Acticle from "./acticle.js"

class List extends React.Component {
    constructor() {
        super();

    }
    componentDidMount() {
      const _this = this;
      let user = this.props.loginState.user;
      if(user ){
          console.log('1231321')
          fetch('/myList',{
            method:"POST",
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify({'user':user})
          }).then(function(res){
            return res.json()
          }).then(function(result){
            _this.props.listDataActions('showData',result.data)
          })
      }else{
          console.log('444444421')
         // _this.props.listDataActions('hideData')
      }

    }
    render(){
        const { listData } =this.props;
          let lists = [];
          if(this.props.loginState.user != undefined){
              listData.data.map(function(item,index){
                  lists.push(<Acticle item = {item} key={index} />)
              })
          }else{
              lists.push(<div key='list' style={{fontSize:'28px',textAlign:'center',marginTop: '100px'}}>请先登录</div>)
          }
          if(listData.data.length == 0){
              lists =[],
              lists.push(<div key='list' style={{fontSize:'28px',textAlign:'center',marginTop: '100px'}}>暂无文章</div>)
          }
        return(
            <div className="content">
                <div style={{height:'650px'}}>
                    {lists}
                </div>
            </div>

        )
    }

}
// 声明 connect 连接
// 将 redux 中的 state传给 App
const mapStateToProps = (state) => {
    return{
        tips:state.tips,
        listData:state.listData,
        loginState:state.loginState,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        listDataActions : bindActionCreators(listData,dispatch),
    }
}

//声明 connect 连接
List = connect(mapStateToProps,mapDispatchToProps)(List);
export default List ;
