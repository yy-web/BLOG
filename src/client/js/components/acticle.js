import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import {Col,Thumbnail,Button} from 'react-bootstrap';

class Acticle extends React.Component {
    render(){
      const { item } = this.props
        return(
            // <Link to={{pathname: '/articleDetail',  query: {id: item._id}, state:{item:item} }} >
            //     <div className="acticle">
            //         <h1 className="title ell">{item.title}</h1>
            //         <div className="acticleContent ell">
            //                 {item.content}
            //         </div>
            //         <div className="detail">
            //           <ul>
            //               <li><span className="info">作者：</span><span>{item.user}</span></li>
            //               <li><span className="info">发表时间：</span><span>{item.date}</span></li>
            //               <li><span className="info">分类：</span><span>{item.classify}</span></li>
            //               <li><span className="info">阅读量：</span><span>{item.times}</span></li>
            //           </ul>
            //         </div>
            //     </div>
            // </Link>
                <Col sm={6} md={4}>
                  <Thumbnail bsClass="thumbnail acticle" src="/static/1.jpg">
                    <div className="Thum_body">
                        <h3 className="Thum_title ell">
                            <Link to={{pathname: '/articleDetail',  query: {id: item._id}, state:{item:item} }} >
                                {item.title}
                            </Link>
                        </h3>

                    </div>
                    <hr/>
                    <div className="Thum_text">
                        <p className="moreEll">{item.content}</p>
                        <div style={{textAlign:'right',paddingBottom:'20px'}}><span>作者：{item.user}</span>&nbsp;<span>阅读量：{item.times}</span>&nbsp;<span>{item.date}</span></div>
                    </div>
                    <div className="more">
                        <Button bsStyle="default">read more</Button>
                    </div>

                  </Thumbnail>
                </Col>

        )

    }

}
export default Acticle;
