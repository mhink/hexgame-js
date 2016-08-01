const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = require('./webpack.base.config.js')({
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    //new webpack.optimize.UglifyJsPlugin({
    //  compress: { 
    //    warnings: false
    //  }
    //}),
    new ExtractTextPlugin('[name].[contenthash].css')
  ],
  cssLoaders: ExtractTextPlugin.extract(
    'style-loader',
    'css-loader',
    'postcss-loader'
  )
})
