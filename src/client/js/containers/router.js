import React from 'react'
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import ReactDOM from 'react-dom'
import Index_main from "../components/index_main.js";
import Publish from "../components/publish";
import List from "../components/list";
import App from "./../../index.js";


import {render} from 'react-dom'
import { Provider, connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as loginActions from '../actions/login'
import loginStore from '../store/store'


let store = loginStore();
const app = document.createElement('div');
document.body.appendChild(app);
// 没用
const routerConfig = [
    {
        path: '/',
        component: App,
        indexRoute: { component: Index_main },
        childrenRoutes: [
            { path: 'publish', component: Publish },
            { path: 'list', component: List },
        ]
    }
];
render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
            <IndexRoute component={Index_main} />
            <Route path="/publish" component={Publish} />
            <Route path="/list" component={List} />
            </Route>
        </Router>
    </Provider>,app)
