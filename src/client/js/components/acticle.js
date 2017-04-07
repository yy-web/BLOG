import React from 'react';
import ReactDOM from 'react-dom';
import { Link,browserHistory } from 'react-router';
import {Col,Thumbnail,Button,Modal} from 'react-bootstrap';

class Acticle extends React.Component {

    constructor(props){
      super(props)
      this.state = {
        show:false,
      }
    }
    handleClick(){
        this.props.item.times++;
        browserHistory.push({
            pathname:'/articleDetail',
            query:{id:this.props.item._id},
            state:{item:this.props.item}
          })

        fetch('/articleDetail?id='+this.props.item._id,{
            method:"GET",
            headers: {"Content-Type":"application/json"},
        })
    }
    modalShow(){
        this.setState({
            show:true
        })
    }
    modalClose(){
        this.setState({
            show:false
        })
    }
    delArticle(){
        const _this = this;
        fetch('/delArticle',{
            method:'POST',
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify({id:_this.props.item._id}),
        }).then(function(res){
            return res.json()
        }).then(function(result){
            _this.props.alertTips(result.mes)
            _this.setState({
                show:false
            })
            const aId = document.getElementById('aId'+_this.props.index);
            aId.parentNode.removeChild(aId)
        })
    }
    render(){
      const { item,user,index } = this.props
        return(
            <div id={"aId"+index}>
                <Col sm={6} md={4}>
                  <Thumbnail bsClass="thumbnail acticle" src={item.img}>
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
                        <Button style={{display: user ? 'inlineBlock': 'none',marginRight:'8px'} } onClick={()=> {this.modalShow()}} bsStyle="primary">删除</Button>
                        <Button onClick={()=> {this.handleClick()}} bsStyle="default">read more</Button>
                    </div>
                  </Thumbnail>
                </Col>
                <Modal show={this.state.show} onHide={()=> {this.modalClose()}}>
                    <Modal.Header>
                        <Modal.Title>删除文章</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        确定删除{item.title}么？
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={()=> {this.modalClose()}}>Close</Button>
                        <Button onClick={()=> {this.delArticle()}} bsStyle="primary">ok!</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )

    }


}

Acticle.propTypes = {
    item: React.PropTypes.object.isRequired,
}
export default Acticle;
