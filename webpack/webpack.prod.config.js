'use strict';

const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const webpackCombineLoaders = require('webpack-combine-loaders');

// Common config.
const { commonLoaders, commonPlugins, distPath, resolve, srcPath } = require('./common.config');

const cssLoader = webpackCombineLoaders([
    {
        loader: 'css-loader',
        query: {
            importLoaders: 2,
            localIdentName: '[name]__[local]___[hash:base64:5]',
            minimize: true,
            modules: true
        }
    },
    { loader: 'postcss-loader' },
    { loader: 'sass-loader' }
]);
const sassLoader = webpackCombineLoaders([
    {
        loader: 'css-loader',
        query: {
            importLoaders: 2,
            minimize: true
        }
    },
    { loader: 'postcss-loader' },
    { loader: 'sass-loader' }
]);

module.exports = {
    devtool: false,

    entry: {
        main: path.resolve(srcPath, 'index.jsx'),
        vendor: [
            // Rule of thumb: add any vendor files that are > 50kb
            'react',
            'react-dom'
        ]
    },

    module: {
        rules: commonLoaders.concat([
            {
                test: /.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: cssLoader
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: sassLoader
                })
            }
        ])
    },

    output: {
        path: distPath,
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].js'
    },

    plugins: commonPlugins.concat([
        new CleanPlugin(distPath),
        new ExtractTextPlugin({
            filename: 'styles.[hash].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor'],
            minChunks: Infinity,
            filename: '[name].[hash].js',
        }),
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 50000, // 50kb
        }),
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compress: {
                warnings: false
            },
            sourceMap: false,
            mangle: true
        })
    ]),

    resolve: resolve
};
