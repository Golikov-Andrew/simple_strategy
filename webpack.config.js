const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development', //development, production
    context: __dirname,
    devtool: "source-map",
    entry: {
        commons: './commons/static/commons/js/main.js',
        play_game: './simple_strategy/static/simple_strategy/js/main.js'
    },
    output: {
        path: path.resolve('./assets/webpack_bundles/'),
        filename: "[name].js" // -[hash]
        // library:"mylib"
    },
    plugins: [
        new BundleTracker({filename: 'webpack-stats.json'}),
        new MiniCssExtractPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'dirname/[contenthash].[ext]',
                        },
                    },
                ],
            },
        ],
    }
}