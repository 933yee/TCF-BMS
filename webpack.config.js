const path = require('path');
const webpack = require('webpack');
const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');

const HtmlWebPackPlugin = require("html-webpack-plugin");
const isDev = (process.env.NODE_ENV === 'development');
console.log(process.env.NODE_ENV)

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./index.html",
    filename: "./index.html"
});

module.exports = {
    context: srcPath,
    resolve: {
        alias: {
            States: path.resolve(srcPath, 'states'),
            Utilities: path.resolve(srcPath, 'utilities'),
            Components: path.resolve(srcPath, 'Components'),
            Home: path.resolve(srcPath, 'Components/Home'),
            api: path.resolve(srcPath, 'api'),
            settings: path.resolve(srcPath, 'settings')
        }
    },
    entry: {
        index: './index.jsx'
    },
    output: {
        path: distPath,
        filename: '[name].bundle.js',
        publicPath: (isDev ? '/' : './')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env', {
                                        modules: false
                                    }
                                ],
                                '@babel/preset-react'
                            ],
                            plugins: [
                                '@babel/plugin-proposal-class-properties',
                                '@babel/plugin-proposal-object-rest-spread'
                            ]
                        }
                    }
                ]
            }, {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'sass-loader'
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    },
    plugins: [htmlPlugin],
    devServer: {
        contentBase: distPath,
        compress: true,
        port: 7070,
        historyApiFallback: true,
    },
    performance: {
        hints: false,
    },
    devtool: 'cheap-source-map'
};

