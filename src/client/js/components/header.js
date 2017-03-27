import React from 'react';
import ReactDOM from 'react-dom';
import {Link,browserHistory } from 'react-router';
import { Provider, connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import * as tipsActions from '../actions/tips';
import listData from '../actions/listData';
import * as pageActions from '../actions/page';
class Header extends React.Component{
  constructor(props){
    super(props)
    this.search;
  }
    onSearch(){
      const _this = this;
      browserHistory.push({
        pathname:'/search',
        query:{ctx: this.search.value},
      })
      fetch('/search',{
        method:"POST",
        headers: {"Content-Type":"application/json"},
        body:JSON.stringify({'searchData':_this.search.value,'num':1})
      }).then(function(res){
        return res.json()
      }).then(function(result){
        var maxItem = Math.ceil(result.max / 6);
        _this.props.pageAction.pageTotal(maxItem)
        _this.props.listDataActions(result.data)
      })
    }
    render(){
        return(
            <div className="clearfix">
                <nav style={{'backgroundColor':'#f7f7f7','height':'65px'}}>
                    <div className="container">
                        <a className='blog' href="#">Blog</a>
                        <div className='search_box' >
                            <form>
                                <input className="search" type="text" ref={e => {this.search = e}}  placeholder="输入搜索内容"/>
                                    <button className="btn btn-outline-secondary" onClick={() => this.onSearch()} type="button">搜索</button>
                            </form>
                        </div>
                    </div>
                </nav>
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
Header = connect(mapStateToProps,mapDispatchToProps)(Header);

export default Header;
