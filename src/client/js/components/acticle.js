import React from 'react';
import ReactDOM from 'react-dom';
import { Link,browserHistory } from 'react-router';
import {Col,Thumbnail,Button} from 'react-bootstrap';

class Acticle extends React.Component {
    constructor(props){
      super(props)
    }
    handleClick(){
      browserHistory.push({
        pathname:'/articleDetail',
        query:{id:this.props.item._id},
        state:{item:this.props.item}
      })
      fetch('/articleDetail?id='+this.props.item._id,{
        method:"GET",
        headers: {"Content-Type":"application/json"},
      }).then(function(res){
          return res.json()
      }).then(function(result){

      })
    }
    render(){
      const { item } = this.props
        return(
            <Col sm={6} md={4}>
              <Thumbnail bsClass="thumbnail acticle" src="/static/1.jpg">
                <div className="Thum_body">
                    <h3 className="Thum_title ell">
                          {item.title}
                    </h3>

                </div>
                <hr/>
                <div className="Thum_text">
                    <p className="moreEll">{item.content}</p>
                    <div style={{textAlign:'right',paddingBottom:'20px'}}><span>作者：{item.user}</span>&nbsp;<span>阅读量：{item.times}</span>&nbsp;<span>{item.date}</span></div>
                </div>
                <div className="more">
                    {/*<Link to={{pathname: '/articleDetail',  query: {id: item._id}, state:{item:item} }} ></Link>*/}
                        <Button onClick={()=>this.handleClick()} bsStyle="default">read more</Button>

                </div>

              </Thumbnail>
            </Col>

        )

    }

}
export default Acticle;
