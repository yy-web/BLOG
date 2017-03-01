var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src/client');
var BUILD_PATH = path.resolve(ROOT_PATH, 'src/client/js/build');
var CSS_PATH = path.resolve(ROOT_PATH,'src/client/css')
var webpack = require('webpack')


module.exports = {
    //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
    entry: [
       './src/client/index.js'
    ],
    //输出的文件名 合并以后的js会命名为bundle.js
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        port:7788,
    },
    //添加我们的插件 会自动生成一个html文件
    plugins: [
        new webpack.ProvidePlugin({
            $:'jquery',
            jQuert:'jquery',
            'window.jQuert':'jquery'
        }),
    ],
    devtool: 'eval-source-map',
    module: {
        preLoaders: [
            {
                test: /\.jsx$|\.js$/,
                loader: 'eslint-loader',
                include: `${__dirname}/app`,
                exclude: /bundle\.js$/,
            },
        ],
        plugins: [
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin()
        ],
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css'],
                include: CSS_PATH
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=40000'
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ]
    },
    resolve: {
        extensions: ['', '.js',]
    },

};