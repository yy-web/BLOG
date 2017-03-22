import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';


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
            <div className="col-md-4 col-sm-6">
                <div className="acticle">
                    <div className="card">
                      <img className="card-img-top" src="/static/1.jpg" alt="Card image cap"/>
                      <div className="card-block">
                          <div className="card-body">
                              <h3 className="card-title ell">{item.title}</h3>
                              <span>{item.date}</span>
                          </div>
                        <hr/>
                        <p className="card-text">
                            {item.content}
                        </p>
                        <a href="#" className="btn btn btn-secondary">read more</a>
                      </div>
                    </div>
                </div>

            </div>
        )

    }

}
export default Acticle;
