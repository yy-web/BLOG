import React from 'react';
import ReactDOM from 'react-dom';

// import "../../css/acticleList.css";
import ActicleList from "./acticleList.js"

class List extends React.Component {
    render(){
        return(
            <div className="content">
                <ActicleList/>
            </div>

        )
    }

}

export default List ;