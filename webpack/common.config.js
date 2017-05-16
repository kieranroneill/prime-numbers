'use strict';

const autoprefixer = require('autoprefixer');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const appTitle = 'Prime Table';
const distPath = path.join(__dirname, '..', 'dist', 'public');
const srcPath = path.join(__dirname, '..', 'src', 'public');

module.exports = {
    appTitle: appTitle,
    commonLoaders: [
        // Handlebars.
        {
            test: /\.hbs$/,
            loader: 'handlebars-loader'
        }
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
