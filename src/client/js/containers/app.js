import React from 'react';
import {render} from 'react-dom';

import Nav from '../components/Nav';
import Header from '../components/header';
import Footer from '../components/footer';

class App extends React.Component{
    render() {
        return  (
            <div className="container-fluid">
                <Nav/>
                <Header/>
                {this.props.children}
                <Footer/>
            </div>

        )
    }
};

export default App;
