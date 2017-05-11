'use strict';

const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');

// Common config.
const { commonLoaders, commonPlugins, distPath, resolve, srcPath } = require('./common.config');

const port = 1337;
const localhost = 'http://localhost';

module.exports = {
    devServer: {
        contentBase: distPath,
        historyApiFallback: true,
        port: port
    },
    devtool: 'source-map',

    entry: [
        'webpack-dev-server/client?' + localhost + ':' + port,
        'webpack/hot/only-dev-server',
        path.resolve(srcPath, 'index.jsx')
    ],

    module: {
        rules: commonLoaders.concat([
            {
                test: /.jsx?$/,
                use: ['react-hot-loader', 'babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            localIdentName: '[name]__[local]___[hash:base64:5]',
                            modules: true
                        }
                    },
                    { loader: 'postcss-loader' },
                    { loader: 'sass-loader' }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader', query: { importLoaders: 2 } },
                    { loader: 'postcss-loader' },
                    { loader: 'sass-loader' }
                ]
            }
        ])
    },

    output: {
        filename: 'bundle.js',
        path: distPath,
        publicPath: '/'
    },

    plugins: commonPlugins.concat([
        new webpack.HotModuleReplacementPlugin(),
        new WebpackNotifierPlugin({
            title: 'UNICORN POWER_UP!!!',
            contentImage: path.resolve(__dirname, 'unicorn.png'),
            alwaysNotify: true
        })
    ]),

    resolve: resolve
};
