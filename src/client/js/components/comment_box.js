import React from 'react';
import { Media } from 'react-bootstrap'
class Comment_box extends React.Component{
  render(){
    const { commentData } = this.props;
    return(
        <Media>
            <Media.Left>
                <img width={64} height={64} src={commentData.icon} alt="Image"/>
            </Media.Left>
            <Media.Body>
                <Media.Heading>{commentData.user}：<span className="CommentDate">{commentData.date}</span></Media.Heading>
                <p>{commentData.content}</p>

            </Media.Body>
        </Media>
    )
  }
}
export default Comment_box ;
