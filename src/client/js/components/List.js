import React from 'react';
import ReactDOM from 'react-dom';
import {Row,Pagination} from 'react-bootstrap';

import { Provider, connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import {tips} from '../actions/tips';
import listData from '../actions/listData';
import Acticle from "./acticle.js";
import * as pageActions from '../actions/page';
import * as fetchList from '../actions/fetchList';

class List extends React.Component {
    constructor() {
        super();

    }
    handleSelect(num){
        this.props.fetchList.pageSelectAction(num)
    }
    componentDidMount() {
      let user = this.props.loginState.user;
      if(user ){
          this.props.fetchList.firstPageAction(user)
      }else{
          console.log('444444421')
      }

    }
    render(){
        const { listData } =this.props;
          let lists = [];
          let flag  = 'none';
          if(this.props.loginState.user != undefined){
            let flag  = 'block'
            const _this = this;
                  listData.data.map(function(item,index){
                        lists.push(<Acticle tipsAction={_this.props.tipsActions} user={_this.props.loginState.user} item = {item} key={index} index={index} />)
                  })
          }else{
              lists.push(<div key='list' style={{fontSize:'28px',textAlign:'center',marginTop: '100px'}}>请先登录</div>)
              flag = 'none';
          }
          if(listData.data.length == 0){
              lists =[],
              lists.push(<div key='list' style={{fontSize:'28px',textAlign:'center',marginTop: '100px'}}>暂无文章</div>)
              flag = 'none';
          }
        return(
            <div className="container" style={{minHeight:650 + 'px'}}>
                <Row>
                    {lists}
                </Row>
                <Row>
                    <div style={{textAlign:'center',display:flag}}>
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
        fetchList : bindActionCreators(fetchList,dispatch),
    }
}

//声明 connect 连接
List = connect(mapStateToProps,mapDispatchToProps)(List);
export default List ;
