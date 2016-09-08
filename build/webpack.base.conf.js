var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var browserslist = require('browserslist')
var HappyPack = require('happypack')

var config = require('../config')
var utils = require('./utils')
var entris = require('./entris')
var projectRoot = path.resolve(__dirname, '../')

baseWebpackConfig = {
    entry: {
        vendor: ['vue']
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: config.build.assetsPublicPath,
        filename: '[name].js'
    },
    externals: {
        'jquery': 'jQuery'
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components')
        }
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue',
            happy: { id: 'vue' }
        }, {
            test: /\.js$/,
            loader: 'babel',
            include: projectRoot,
            exclude: /node_modules/,
            happy: { id: 'js' }
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.html$/,
            loader: 'vue-html'
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
        }]
    },
    vue: {
        loaders: utils.cssLoaders()
    },
    postcss: [
        autoprefixer({ browsers: browserslist('last 2 version, > 0.1%')})
    ],
    plugins: [
        new HappyPack({ id: 'vue', threads: 4 }),
        new HappyPack({ id: 'js', threads: 4 }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ]
}
baseWebpackConfig.entry = Object.assign(baseWebpackConfig.entry, entris)
module.exports = baseWebpackConfig
