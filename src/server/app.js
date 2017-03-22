import express from 'express';
import qs from 'qs';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session'

import morgan  from 'morgan';
import mongoose from 'mongoose';
import dbConfig from './config';
import apiRouter from './routes/api'

import webpack from 'webpack'
import React from 'react'
import thunk from 'redux-thunk'
import { renderToString } from 'react-dom/server'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import { RouterContext,match,browserHistory } from 'react-router';
import { Provider } from 'react-redux'
import { combineReducers, createStore, applyMiddleware } from "redux"
import webpackConfig from '../../webpack.config'
import routes from '../common/routes'
import stores from '../client/js/store/store'


var path = require('path');
var MongoStore = require('connect-mongo')(session)
import favicon from 'serve-favicon';



const app =  new express();
const port = process.env.PORT || 3333;

mongoose.connect(dbConfig.blog)
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:false }))
app.use(favicon(path.join(__dirname,'public','favicon.ico'))) //set favicon
app.use(cookieParser())
app.use('/static',express.static(__dirname + '/public'))
app.use(session({
    secret:'yy',
    resave:false,
    name:'user',
    cookie: { maxAge: 70000 },
    saveUninitialized:true,
    store:new MongoStore({
        url:dbConfig.blog
    })
}))
/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');*/

const handleRender = (req,res) => {
    match({ routes,location:req.url },(error, redirectLocation, renderProps) => {
        if (error){
            res.status(500).send(error.message)
            console.log(500)
        }else if (redirectLocation){
            console.log(302)
            res.redirect(302,redirectLocation.pathname + redirectLocation.search)
        }else if (renderProps == null){
            console.log(404)
            res.status(404).send('Not found')
        }
        const initialState = {
            data:'',
            bool:false
        }
        console.log('session',req.session.user)
        let state = {
            "login": {
                "data": "",
                "bool": false
            },
            "tips": {
                "mes": ''
            },
            "loginState": {
                user: req.session.user
            }
        }
        let store = createStore(
            stores,
            state,
            applyMiddleware(thunk)
        );
        const initView = renderToString(
            <Provider store={store}>
                <RouterContext history={browserHistory} {...renderProps}/>
            </Provider>
        );
        //let state = store.getState();
        let finaly = store.getState();
        let page = renderFullPage(initView,finaly)
        return res.status(200).send(page)

    })
        // .catch(err => res.end(err.message))

}
/**
<link rel="stylesheet" href="/static/stylesheets/base.css" />
<link rel="stylesheet" href="/static/stylesheets/nav.css" />
<link rel="stylesheet" href="/static/stylesheets/header.css" />
<link rel="stylesheet" href="/static/stylesheets/footer.css" />
<link rel="stylesheet" href="/static/stylesheets/index_main.css" />
<link rel="stylesheet" href="/static/stylesheets/loginBox.css" />
<link rel="stylesheet" href="/static/stylesheets/acticle.css" />
<link rel="stylesheet" href="/static/stylesheets/publish.css" />
<link rel="stylesheet" href="/static/stylesheets/articleDetail.css" />
<link rel="stylesheet" href="/static/stylesheets/footer.css" />

**/
function renderFullPage(html,state){
  return `
      <!DOCTYPE html>
          <html lang="en">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <head>
                <meta charset="UTF-8">
                <title>Title</title>
                <link rel="stylesheet" href="/static/bootstrap/dist/css/bootstrap.min.css" />
                <link rel="stylesheet" href="/static/stylesheets/style.css" />
                <style>

                </style>
            </head>
            <body>
                <div id='app'>

                </div>
                <script>
                    window.__ININIAL_STATE__ = ${JSON.stringify(state)};
                </script>
              <script src='/static/bundle.js'></script>
              <script src='/static/jquery/dist/jquery.min.js'></script>
              <script src='/static/bootstrap/dist/js/bootstrap.min.js'></script>
            </body>
          </html>
  `
}

const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler,{ noInfo:true,publicPath:webpackConfig.output.publicPath}))
app.use(webpackHotMiddleware(compiler))
app.use('/',apiRouter)
// 每次 server 接到 request 都會呼叫 handleRender
app.use(handleRender);


app.listen(port,(error) => {
  if(error){
    console.log(error)
  }else{
    console.info( `==> listening on port ${port}.open up http://localhost:${port}/ in your browser`)
  }
})

// view engine setup
/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);*/

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/

module.exports = app;
