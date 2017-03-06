import React from 'react';
import ReactDOM from 'react-dom';

class ActicleList extends React.Component {
    render(){
        return(
            <div className="acticleList">
                <h1 className="title">aaaa</h1>
                <div className="acticleContent">
                        adfasdfasdfasdf
                </div>
                <div className="detail">
                    <ul>
                        <li><span className="info">作者：</span><span>123</span></li>
                        <li><span className="info">发表时间：</span><span>12123123123123</span></li>
                        <li><span className="info">分类：</span><span>123123</span></li>
                        <li><span className="info">阅读量：</span><span>123123</span></li>
                    </ul>

                </div>
            </div>
        )

    }

}
export default ActicleList;
