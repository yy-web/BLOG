import React from 'react';
import ReactDOM from 'react-dom';

/*import "../../css/publish.css";*/

class Publish extends React.Component {
    render(){
        return(
            <div className="content">
                <div className="publish">
                    <form action="">
                        <ul>
                            <li>
                                <span className="title">文章标题：</span><input className="input" type="text" />
                            </li>
                            <li>
                                <span className="title">文章内容：</span><textarea name="" id="" cols="30" rows="10"></textarea>
                            </li>
                            {/*<li>
                                <span className="title">上传图片：</span><input className="input" type="file" />
                            </li> */}
                            <li>
                                <span className="title">文章分类：</span>
                                <select name="" id="">
                                    <option value="">12</option>
                                    <option value="">34</option>
                                    <option value="">56</option>
                                    <option value="">其他</option>
                                </select>
                            </li>
                        </ul>
                        <div className="btn_group">
                            <input type="submit" value="发表" className="btn"/>
                        </div>

                    </form>

                </div>
            </div>

        )
    }

}

export default Publish ;
