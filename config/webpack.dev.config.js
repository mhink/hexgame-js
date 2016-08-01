const host = "localhost"
const port = 3000

module.exports = require('./webpack.base.config.js')({
  devtool: 'cheap-module-eval-source-map',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: `http://${host}:${port}/`,
  },
  devServer: {
    historyApiFallback: true,
    inline: true,
    stats: 'error-only',
    host: host,
    port: port
  },
  plugins: [],
  cssLoaders: 'style-loader!css-loader?sourceMap!postcss-loader',
})
