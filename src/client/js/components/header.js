import React from 'react';
import ReactDOM from 'react-dom';

class Header extends React.Component{
    render(){
        return(
            <div>
                <div className="search_box content">
                    <div href="#" className="logo_img">yy</div>
                    <div className="search_bar">
                        <form action="">
                            <input type="text" className="search_input" placeholder="输入搜索内容"/>
                            <a href="javascript:void (0)" className="search_btn">搜索</a>
                        </form>
                    </div>
                </div>
                <div id="locking"></div>
            </div>



        )
    }
}
export default Header;