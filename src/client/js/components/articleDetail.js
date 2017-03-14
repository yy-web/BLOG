import React from 'react'
class Adetaile extends React.Component{
  render(){
    return(
        <div className="Adetaile">
            <div className="title">xxxxxx</div>
            <div className="a_mes">
                <ul>
                    <li><span className="info">作者：</span><span>xxxx</span></li>
                    <li><span className="info">发表时间：</span><span>xxx</span></li>
                    <li><span className="info">分类：</span><span>xxxx</span></li>
                    <li><span className="info">阅读量：</span><span>xxxx</span></li>
                </ul>
            </div>
            <div className="content">
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            </div>
            <div className="comment_mes">
                <h1>评论区</h1>
                <div className="content">
                    阿萨德法师打发斯蒂芬
                </div>
            </div>
            <div className="comment">
                <h1>发表评论</h1>
                <div className="commentForm">
                    <from>
                        <span className="title">评论：</span><textarea name="" id="" cols="30" rows="10"></textarea>
                    </from>
                </div>
            </div>

        </div>
    )
  }
}
export default Adetaile ;
