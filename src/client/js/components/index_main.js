import React from 'react';
import ReactDOM from 'react-dom';

/*import '../../css/index_main.css';
import "../../css/header.css";
import "../../css/acticleList.css";*/

import Header from "./header.js"
import ActicleList from "./acticleList.js"

class Index_main extends React.Component {
    constructor() {
        super();

    }
    componentDidMount() {

    }

    render() {


        return (
            <div>
                <Header/>
                <div className="main content" style={{height:650 + 'px'}}>
                    <ActicleList />
                </div>
            </div>


        )
    }

}

export default Index_main;
