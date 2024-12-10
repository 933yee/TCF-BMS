const path = require('path');
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
            States: path.resolve(srcPath, 'States'),
            Utilities: path.resolve(srcPath, 'Utilities'),
            Components: path.resolve(srcPath, 'Components'),
        }
    },
    entry: {
        index: './index.jsx'
    },
    output: {
        path: distPath,
        filename: '[name].bundle.js',
        publicPath: (isDev ? '/' :  'https://bms.carbon-walker.com/')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                use:
                {
                    loader: 'babel-loader',

                }

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
            }
        ]
    },
    plugins: [htmlPlugin],
    devServer: {
        static: distPath,
        // contentBase: distPath,
        compress: true,
        port: 7070,
        historyApiFallback: true,
    },
    performance: {
        hints: false,
    },
    devtool: 'cheap-source-map'
};

