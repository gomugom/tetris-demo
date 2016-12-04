var path = require('path');
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');

var compiler = webpack(config);

var serverOptions = {
    contentBase: path.resolve(__dirname, 'src'),
    progress: true,
    hot: true,
    watch: true,
    verbose: true,
    publicPath: config.URL,
    historyApiFallback: true,
    stats: {
        cached: true,
        cachedAssets: true,
        chunks: true,
        chunkModules: false,
        colors: true,
        hash: false,
        reasons: true,
        timings: true,
        version: false
    }
};

var server = new webpackDevServer(compiler, serverOptions);

server.listen(config.PORT, function() {
    console.log('now listening ' + config.URL);
})
