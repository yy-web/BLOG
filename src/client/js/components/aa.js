import React from 'react';
import ReactDOM from 'react-dom';

import Title_block from './title_block.js'
import Mes_list from './mes_list.js'
import $ from 'jquery'
import '../../css/message.css'
class Message extends React.Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            mes_list:[],
            zixun_list:[],
            gonggao_list:[],
            title:'',
            inblock:''
        };
    }

    componentDidMount() {
        console.log('componentDidMount')
        this.setState({
                title:$('.select').text()
            },function(){
                $.ajax({
                    type: 'GET',
                    url: this.state.title == '信息公告' ? 'http://guahao.jkqd.gov.cn/user-web/restapi/common/corpNews/newsInfo?unionId=29&type=4%2C7&ver=1.0' : 'http://guahao.jkqd.gov.cn/user-web/restapi/common/corpNews/newsInfo?unionId=29&type=2%2C3&ver=1.0',
                    dataType: 'jsonp',
                    success: function (result) {
                        this.setState({
                            mes_list: result.data.introsNews
                            //inblock:this.state.title == '信息公告' ? 'inline-block' : 'none'
                        })
                        console.log(result)
                    }.bind(this),
                    error: function () {
                        console.log('error')
                    }
                })
            }
        )

    }
    componentWillReceiveProps(){

        this.setState({
            mes_list: $('.select').text() == '信息公告' ? this.state.gonggao_list : this.state.zixun_list,
        });
        $.ajax({
            type: 'GET',
            url: $('.select').text() == '信息公告' ? 'http://guahao.jkqd.gov.cn/user-web/restapi/common/corpNews/newsInfo?unionId=29&type=4%2C7&ver=1.0' : 'http://guahao.jkqd.gov.cn/user-web/restapi/common/corpNews/newsInfo?unionId=29&type=2%2C3&ver=1.0',
            dataType: 'jsonp',
            success: function (result) {
                if ($('.select').text() == '信息公告') {
                    this.setState({
                        gonggao_list: result.data.introsNews
                    },function () {
                        if(this.state.gonggao_list.toString() !== this.state.mes_list.toString() ){
                            console.log(1);
                            this.setState({
                                mes_list: result.data.introsNews,
                            })
                        }
                    });
                } else {

                    this.setState({
                        zixun_list: result.data.introsNews
                    },function () {
                        if(this.state.zixun_list.toString() !== this.state.mes_list.toString()){
                            console.log(2);
                            this.setState({
                                mes_list: result.data.introsNews,
                            })
                        }
                    });
                }
                console.log('ok')
            }.bind(this),
            error: function () {
                console.log('error')
            }
        })
    }

    render(){
        var mes = this.state.mes_list.map((items,index) =>{
            return <Mes_list mes={items} key={index} inblock={this.state.inblock} />
        })
        return(
            <div className="content">
                <div className="crumbs">
                    <a href="#">首页</a>
                    <span> > </span>
                    <a href="">{this.state.title}</a>
                </div>
                <div className="" style={{border:'1px solid #f3f7fa'}}>
                    <Title_block title={this.state.title} moreState={'none'}  otherState={'none'}/>
                    <div style={{padding:'10px 15px'}}>
                        <ul className="mes_list">
                            {mes}
                        </ul>


                    </div>
                </div>
            </div>
        )
    }
}
export default Message;