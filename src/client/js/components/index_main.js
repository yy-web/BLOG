import React from 'react';
import ReactDOM from 'react-dom';

/*import '../../css/index_main.css';
import "../../css/header.css";
import "../../css/acticleList.css";*/

import Header from "./header.js"
import ActicleList from "./acticleList.js"

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
        console.log('listData',listData)
        if(listData.data !== ''){
          for(var i = 0; i < listData.data.length ; i++){
            lists.push(<ActicleList item = {listData.data[i]} key={i} />)
          }
        }

        return (
            <div>
                <Header/>
                <div className="main content" style={{height:650 + 'px'}}>
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
