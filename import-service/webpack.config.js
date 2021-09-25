const path = require('path');
const sls = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');


module.exports = {
    context: __dirname,
    mode: sls.lib.webpack.isLocal ? 'development' : 'production',
    entry: sls.lib.entries,
    devtool: sls.lib.webpack.isLocal ? 'cheap-module-eval-source-map' : false,
    resolve: {
        extensions: ['.json', '.js'],
        symlinks: false,
        cacheWithContext: false
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, 'build'),
        filename: '[name].js'
    },
    target: 'node',
    externals: [nodeExternals()]
}
