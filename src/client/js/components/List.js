import React from 'react';
import ReactDOM from 'react-dom';
import {Row,Pagination} from 'react-bootstrap';

import { Provider, connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import * as tipsActions from '../actions/tips';
import listData from '../actions/listData';
import Acticle from "./acticle.js";
import * as pageActions from '../actions/page';

class List extends React.Component {
    constructor() {
        super();

    }
    handleSelect(num){
        this.props.pageAction.pagination(num);
        const _this = this;
        fetch('/list',{
          method:'POST',
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({"num":num})
        }).then(function(res){
            return res.json();
        }).then(function(result){
          console.log(result);
            _this.props.listDataActions(result.data)
        })
    }
    componentDidMount() {
      const _this = this;
      let user = this.props.loginState.user;
      if(user ){
          fetch('/list',{
            method:"POST",
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify({'user':user,"num":1})
          }).then(function(res){
            return res.json()
          }).then(function(result){
            var maxItem = Math.ceil(result.max / 9);
            _this.props.pageAction.pageTotal(maxItem)
            _this.props.listDataActions(result.data)
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
            <div className="container" style={{minHeight:650 + 'px'}}>
                <Row>
                    {lists}
                </Row>
                <Row>
                    <div style={{textAlign:'center'}}>
                        <Pagination
                            bsSize="large"
                            prev
                            next
                            first
                            last
                            ellipsis
                            boundaryLinks
                            items={this.props.pageNum.total}
                            maxButtons={5}
                            activePage={this.props.pageNum.num}
                            onSelect={this.handleSelect.bind(this)} />
                    </div>
                </Row>
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
        pageNum:state.pageNum
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        listDataActions : bindActionCreators(listData,dispatch),
        pageAction : bindActionCreators(pageActions,dispatch),
    }
}

//声明 connect 连接
List = connect(mapStateToProps,mapDispatchToProps)(List);
export default List ;
