'use strict';

const autoprefixer = require('autoprefixer');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const appTitle = 'Prime Table';
const distPath = path.join(__dirname, '..', 'dist', 'public');
const srcPath = path.join(__dirname, '..', 'src', 'public');
const uriLimit = 50000;

module.exports = {
    appTitle: appTitle,
    commonLoaders: [
        // Handlebars.
        {
            test: /\.hbs$/,
            loader: 'handlebars-loader'
        },
        {
            test: /\.svg$/,
            loader: 'url-loader',
            options: {
                limit: uriLimit,
                mimeType: 'image/svg+xml'
            }
        },
        {
            test: /\.woff$/,
            loader: 'url-loader',
            options: {
                limit: uriLimit,
                mimeType: 'application/font-woff'
            }
        },
        {
            test: /\.woff2$/,
            loader: 'url-loader',
            options: {
                limit: uriLimit,
                mimeType: 'application/font-woff2'
            }
        },
        {
            test: /\.[ot]tf$/,
            loader: 'url-loader',
            options: {
                limit: uriLimit,
                mimeType: 'application/octet-stream'
            }
        },
        {
            test: /\.eot$/,
            loader: 'url-loader',
            options: {
                limit: uriLimit,
                mimeType: 'application/vnd.ms-fontobject'
            }
        },
    ],
    commonPlugins: [
        new FaviconsWebpackPlugin({
            logo: path.resolve(srcPath, 'favicon.png'),
            title: appTitle
        }),
        new HtmlWebpackPlugin({
            title: appTitle,
            inject: 'body',
            template: path.resolve(srcPath, 'index.hbs'),
            minify: false
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: () => [
                    autoprefixer({ browsers: ['last 3 versions'] })
                ]
            }
        })
    ],
    distPath: distPath,
    resolve: {
        extensions: ['.js', '.jsx']
    },
    srcPath: srcPath
};
