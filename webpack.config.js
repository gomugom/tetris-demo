var path = require('path');
var webpack = require('webpack');

var HOST  = 'http://localhost';
var PORT  = 8080;
var URL   = HOST + ':' + PORT + '/';
var _PATH = path.resolve(__dirname, 'src');

module.exports = {
    HOST: HOST,
    PORT: PORT,
    URL: URL,
    devtool: 'cheap-module-eval-source-map',
    context: _PATH,
    entry: {
        index: [
            'webpack-dev-server/client?' + HOST + ':' + PORT,
            'webpack/hot/only-dev-server',
            path.resolve(_PATH, 'main')
        ]
    },
    output: {
        path: _PATH,
        filename: 'bundle.js',
        publicPath: URL
    },
    module: {
        loaders: [{
            test: /\.scss$/,
            include: [ _PATH ],
            loaders: ['style', 'css?sourceMap!sass']
        }]
    },
    resolve: {
        root: [ _PATH ],
        extensions: [ '', '.js' ]
    },
    node: { fs: "empty" },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.EvalSourceMapDevToolPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
