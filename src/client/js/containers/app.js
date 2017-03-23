import React from 'react';
import {render} from 'react-dom';

import TopNav from '../components/Nav';
import Header from '../components/header';
import Footer from '../components/footer';

class App extends React.Component{
    render() {
        return  (
            <div className="container-fluid">
                <TopNav/>
                <Header/>
                {this.props.children}
                <Footer/>
            </div>

        )
    }
};

export default App;
