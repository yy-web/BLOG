import React from 'react';
import ReactDOM from 'react-dom';
import {Row} from 'react-bootstrap';

/*import '../../css/index_main.css';
import "../../css/header.css";
import "../../css/acticleList.css";*/

import Acticle from "./acticle.js"

import { Provider, connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import * as tipsActions from '../actions/tips';
import listData from '../actions/listData';


class Index_main extends React.Component {
    constructor() {
        super();

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
          _this.props.listDataActions('showData',result.data)
        })
    }

    render() {
      const { listData } =this.props;
        let lists = [];
        // if(listData.data.length > 0){
        //   for(var i = 0; i < listData.data.length ; i++){
        //     lists.push(<Acticle item = {listData.data[i]} key={i} />)
        //   }
        // }else{
        //     lists.push(<div key='list' style={{fontSize:'28px',textAlign:'center',marginTop: '100px'}}>暂无文章</div>)
        // }
        console.log(11,listData.data)

            listData.data.map(function(item,index){
                lists.push(<Acticle item = {item} key={index} />)
            })
        if(listData.data.length == 0){
            lists = [];
            lists.push(<div key='list' style={{fontSize:'28px',textAlign:'center',marginTop: '100px'}}>暂无文章</div>)
        }
            // listData.data.map(function(item,index){
            //     lists.push(<Acticle item = {item} key={index} />)
            // })
            // if(listData.data == ''){
            //     lists.push(<div key='list' style={{fontSize:'28px',textAlign:'center',marginTop: '100px'}}>暂无文章</div>)
            // }

        return (
            <div>
                <div className="container" style={{height:650 + 'px'}}>
                    <div className="row">
                            {lists}
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
        tips:state.tips,
        listData:state.listData
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        listDataActions : bindActionCreators(listData,dispatch),
    }
}

//声明 connect 连接
Index_main = connect(mapStateToProps,mapDispatchToProps)(Index_main);


export default Index_main;
