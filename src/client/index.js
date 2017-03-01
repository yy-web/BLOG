import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {render} from 'react-dom'
import { Provider, connect} from 'react-redux'
import loginStore from '../client/js/store/login'
import routes from '../common/routes'
;
/*css*/
/*import "./css/base.css";
import "./css/nav.css";*/
/*jq*/
import $ from 'jquery'


let store = loginStore();

// const app = document.createElement('div');
// document.body.appendChild(app);


render(
    <Provider store={store}>
        <Router routes={routes} history={browserHistory}/>
    </Provider>,document.getElementById('app'))