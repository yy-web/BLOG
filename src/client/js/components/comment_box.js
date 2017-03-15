import React from 'react'
class Comment_box extends React.Component{
  render(){
    const { commentData } = this.props;
    return(
        <div className="comment_box">
            <div className="userName">{commentData.user}：</div>
            <div className="userComment">
                <p>{commentData.content}</p>
                <span className="CommentDate">{commentData.date}</span>
            </div>
        </div>
    )
  }
}
export default Comment_box ;
