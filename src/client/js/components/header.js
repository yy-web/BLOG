import React from 'react';
import ReactDOM from 'react-dom';

class Header extends React.Component{
    render(){
        return(
            <div>
                {/* <div className="search_box content">
                    <div href="#" className="logo_img">yy</div>
                    <div className="search_bar">
                        <form action="">
                            <input type="text" className="search_input" placeholder="输入搜索内容"/>
                            <a href="javascript:void (0)" className="search_btn">搜索</a>
                        </form>
                    </div>
                </div> */}
                <nav style={{'background-color':'#f7f7f7'}} className="navbar navbar-toggleable-md">
                    <div className="container">
                        <a className="navbar-brand" style={{color:'#7b8690'}} href="#">Blog</a>
                        <div style={{'float':'right'}} >
                            <form className="form-inline">
                                <input className="form-control mr-sm-2" type="text" placeholder="Search"/>
                                <button className="btn btn-outline-secondary my-2 my-sm-0" type="submit">搜索</button>
                            </form>
                        </div>


                    </div>
                </nav>
            </div>



        )
    }
}
export default Header;
