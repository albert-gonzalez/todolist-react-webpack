var path = require('path');
var webpack = require('webpack');
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

module.exports = {
    entry: {
        todolist: './src/todolist/js/main.js'
    },
    output: {
        path:     'dist',
        filename: '[name].bundle.js',
        publicPath: "/dist/"
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new UglifyJsPlugin({
            beautify: false,
            mangle: false,
            compress : { screw_ie8 : true },
            comments: false

        })
    ]
};