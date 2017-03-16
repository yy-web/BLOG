import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';


class Acticle extends React.Component {
    render(){
      const { item } = this.props
        return(
            <Link to={{pathname: '/articleDetail',  query: {id: item._id}, state:{item:item} }} >
                <div className="acticle">
                    <h1 className="title ell">{item.title}</h1>
                    <div className="acticleContent ell">
                            {item.content}
                    </div>
                    <div className="detail">
                      <ul>
                          <li><span className="info">作者：</span><span>{item.user}</span></li>
                          <li><span className="info">发表时间：</span><span>{item.date}</span></li>
                          <li><span className="info">分类：</span><span>{item.classify}</span></li>
                          <li><span className="info">阅读量：</span><span>{item.times}</span></li>
                      </ul>
                    </div>
                </div>
            </Link>

        )

    }

}
export default Acticle;
