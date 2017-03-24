import React from 'react';
import ReactDOM from 'react-dom';
import {Row,Pagination} from 'react-bootstrap';

/*import '../../css/index_main.css';
import "../../css/header.css";
import "../../css/acticleList.css";*/

import Acticle from "./acticle.js"

import { Provider, connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import * as tipsActions from '../actions/tips';
import listData from '../actions/listData';
import * as pageActions from '../actions/page';


class Index_main extends React.Component {
    constructor() {
        super();

    }
    handleSelect(num){
        this.props.pageAction.pagination(num)
    }
    componentDidMount() {
      const _this = this
        fetch('/list',{
          method:"POST",
          headers: {"Content-Type":"application/json"},
          body:''
        }).then(function(res){
          return res.json()
        }).then(function(result){
            console.log(1,result.data.length)
            console.log(2,result.data)
            _this.props.pageAction.pageTotal(result.data.length)
            _this.props.listDataActions('showData',result.data);

        })
    }

    render() {
      const { listData } =this.props;
        let lists = [];
        listData.data.map(function(item,index){
            lists.push(<Acticle item = {item} key={index} />)
        })
        if(listData.data.length == 0){
            lists = [];
            lists.push(<div key='list' style={{fontSize:'28px',textAlign:'center',marginTop: '100px'}}>暂无文章</div>)
        }
        return (
            <div>
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
Index_main = connect(mapStateToProps,mapDispatchToProps)(Index_main);


export default Index_main;
