var webpack = require('webpack')
var path = require('path')
var fetch = require('node-fetch')
var https = require("https");
var body_parser = require("body-parser");

var BUILD_DIR = path.resolve(__dirname + '/build')
var APP_DIR = path.resolve(__dirname + '/app')

var config = {
    entry: APP_DIR + '/index.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js',
        publicPath: '/'
    },
    devtool: 'source-map',
    devServer: {
        inline: true,
        contentBase: BUILD_DIR,
        port: 80,
        historyApiFallback: {
            index: 'index.html'
        },
        before: function(app) {
            app.use(body_parser.json());

            app.all('/api/**', function(req,res) {
                fetch_config = {
                    method: req.method,
                    headers: req.headers,
                    body: JSON.stringify(req.body),
                    agent: new https.Agent({
                        rejectUnauthorized: false
                    })
                }

                fetch('https://dashboard.meraki.com/' + req.originalUrl,fetch_config).then((response) => {
                    response.json().then((body) => {
                        res.status(response.status).json(body)
                    })                    
                })
            });
        }
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }

            }
        ]
    }
    
}

module.exports = config
