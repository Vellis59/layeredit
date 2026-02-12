const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const projectRoot = path.resolve(__dirname);

module.exports = {
    mode: isProduction ? 'production' : 'development',
    entry: {
        app: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: isProduction ? 'js/[name].[contenthash].js' : 'js/[name].js',
        clean: true,
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': path.join(__dirname, 'src'),
            'vue$': 'vue/dist/vue.esm.js' // Use full build for template compilation if needed
        },
        fallback: {
            fs: false,
            path: false,
            crypto: false
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[name].[hash][ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name].[hash][ext]'
                }
            },
            {
                test: /\.(md|yml|html)$/, // raw-loader replacement
                type: 'asset/source',
                exclude: [/index\.html$/]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            minify: isProduction ? {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            } : false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(isProduction ? 'production' : 'development'),
                VERSION: JSON.stringify(require('./package.json').version)
            },
            'VERSION': JSON.stringify(require('./package.json').version)
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'static'),
                    to: 'static',
                    noErrorOnMissing: true
                }
            ]
        })
    ].concat(isProduction ? [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css'
        })
    ] : [
        new ESLintPlugin({
            extensions: ['js', 'vue'],
            files: 'src',
            emitError: true,
            emitWarning: true
        })
    ]),
    optimization: {
        minimize: isProduction,
        minimizer: [
            `...`,
            new CssMinimizerPlugin()
        ],
        splitChunks: {
            chunks: 'all'
        }
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        static: {
            directory: path.join(__dirname, 'static'),
        },
        port: 8080,
        client: {
            overlay: {
                errors: true,
                warnings: false,
            },
        },
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map'
};
