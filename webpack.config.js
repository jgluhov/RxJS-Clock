const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src",

    output: {
        path: path.resolve(__dirname, "docs"),
        filename: "js/bundle.js"
    },

    devtool: 'inline-source-map',

    resolve: {
        extensions: ['.ts', '.js']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                include: [
                    path.resolve(__dirname, "src")
                ],
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                loader: "ts-loader"
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ],

    devServer: {
        contentBase: path.join(__dirname, "docs"),
        compress: true,
        port: 9000,
        historyApiFallback: true
    }
}