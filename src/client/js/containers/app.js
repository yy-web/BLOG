import React from 'react';
import {render} from 'react-dom';

import Nav from '../components/Nav';
import Footer from '../components/footer';

class App extends React.Component{
    render() {
        return  (
            <div>
                <Nav/>
                {this.props.children}
                <Footer/>
            </div>

        )
    }
};

export default App;
