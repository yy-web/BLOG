import React from 'react'
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import ReactDOM from 'react-dom'
import Index_main from "./components/index_main.js";
import Publish from "./components/publish";
import List from "./components/list";
import Adetaile from "./components/articleDetail";
import App from "./containers/app";
const route = () =>(
    <Route path="/"  component={App}>
        <IndexRoute component={Index_main} />
        <Route path="/publish" component={Publish} />
        <Route path="/list" component={List} />
        <Route path="/articleDetail/:id" component={Adetaile} />
    </Route>
)

export default route;
