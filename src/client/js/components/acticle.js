import React from 'react';
import ReactDOM from 'react-dom';

class Acticle extends React.Component {
    render(){
      const { item } = this.props
        return(
            <div className="acticleList">
                <h1 className="title">{item.title}</h1>
                <div className="acticleContent">
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
        )

    }

}
export default Acticle;
