import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {render} from 'react-dom'
import thunk from 'redux-thunk'
import { combineReducers, createStore, applyMiddleware } from "redux"
import { Provider, connect} from 'react-redux'
import stores from './js/store/store'
import routes from '../common/routes'
;
/*css*/
/*import "./css/base.css";
import "./css/nav.css";*/
/*jq*/
import $ from 'jquery'

const initialState = window.__ININIAL_STATE__;
let store = createStore(
    stores,
    initialState,
    applyMiddleware(thunk)
);


render(
    <Provider store={store}>
        <Router routes={routes} history={browserHistory}/>
    </Provider>,document.getElementById('app'))
