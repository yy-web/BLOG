import React from 'react';
import ReactDOM from 'react-dom';

class Header extends React.Component{
    render(){
        return(
            <div className="clearfix">
                {/* <div className="search_box content">
                    <div href="#" className="logo_img">yy</div>
                    <div className="search_bar">
                        <form action="">
                            <input type="text" className="search_input" placeholder="输入搜索内容"/>
                            <a href="javascript:void (0)" className="search_btn">搜索</a>
                        </form>
                    </div>
                </div> */}
                <nav style={{'backgroundColor':'#f7f7f7','height':'65px'}}>
                    <div className="container">
                        <a className='blog' href="#">Blog</a>
                        <div className='search_box' >
                            <form>
                                <input className="search" type="text" placeholder="Search"/>
                                <button className="btn btn-outline-secondary" type="submit">搜索</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </div>



        )
    }
}
export default Header;
