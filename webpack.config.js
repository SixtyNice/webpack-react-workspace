const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');

const htmlPlugin = new HtmlWebpackPlugin({
    template: "./public/index.html",
    filename: "./index.html"
});


const minCss = new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css',
    ignoreOrder: false, // Enable to remove warnings about conflicting order
});



const optimizeCss = new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.(sa|sc|c)ss$/,
    cssProcessor: require('cssnano'),
    cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
    },
    canPrint: true
})

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: __dirname + '/dist',
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                            reloadAll: true,
                        },
                    },
                    
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.sass', '.scss']
    },

    plugins: [htmlPlugin, minCss, optimizeCss]
};