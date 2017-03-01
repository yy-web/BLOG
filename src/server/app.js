import express from 'express';
import qs from 'qs';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan  from 'morgan';
import mongoose from 'mongoose';
import dbConfig from './config';
import apiRouter from './routes/api'

import webpack from 'webpack'
import React from 'react'
import { renderToString } from 'react-dom/server'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import { RouterContext,match,browserHistory } from 'react-router';
import { Provider } from 'react-redux'

import webpackConfig from '../../webpack.config'
import routes from '../common/routes'
import loginStore from '../client/js/store/login'


var path = require('path');
/*var favicon = require('serve-favicon');

*/

const app =  new express();
const port = process.env.PORT || 3333;
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:false }))
app.use('/static',express.static(__dirname + '/public'))

app.use(morgan('dev'))

mongoose.connect(dbConfig.blog)
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
        const store = loginStore()
        const initView = renderToString(
            <Provider store={store}>
                <RouterContext history={browserHistory} {...renderProps}/>
            </Provider>
        );
        let state = store.getState();
        let page = renderFullPage(initView,state)
        return res.status(200).send(page)

    })
        // .catch(err => res.end(err.message))

}
function renderFullPage(html,state){
  return `
      <!DOCTYPE html>
          <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Title</title>
                <link rel="stylesheet" href="/static/stylesheets/base.css" />
                <link rel="stylesheet" href="/static/stylesheets/nav.css" />
                <link rel="stylesheet" href="/static/stylesheets/header.css" />
                <link rel="stylesheet" href="/static/stylesheets/footer.css" />
                <link rel="stylesheet" href="/static/stylesheets/index_main.css" />
                <link rel="stylesheet" href="/static/stylesheets/loginBox.css" />
                <link rel="stylesheet" href="/static/stylesheets/acticleList.css" />
                <link rel="stylesheet" href="/static/stylesheets/publish.css" />
            </head>
            <body>
               <div id='app'>
               
               </div>
              
              <script src='/static/bundle.js'></script>
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
