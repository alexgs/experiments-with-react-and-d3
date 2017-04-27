const webpack = require( 'webpack' );
const webpackMerge = require( 'webpack-merge' );
const commonConfig = require( './webpack.common.js' );
const devConfig = require( './webpack.development' );

module.exports = function( options ) {
    return webpackMerge( commonConfig( options ), devConfig( options ), {
    // let config = webpackMerge( commonConfig( options ), devConfig( options ), {
        entry: [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server',
            './src/index.jsx'
        ],

        module: {
            /**
             * Load styles directly into the DOM when running the dev server.
             * "ExtractTextPlugin" doesn't get along with HMR.
             */
            rules: [ {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            } ]
        },

        devServer: {
            hot: true,
            contentBase: options.outputPath,
            publicPath: options.publicPath
        },

        // devServer: {
        //     colors: true,
        //     contentBase: './dist',
        //     historyApiFallback: true,
        //     host: 'localhost',
        //     hot: true,
        //     inline: true,
        //     keepAlive: true,
        //     port: 8080,
        //     stats: 'normal'
        // }

        plugins: [
            // Enable HMR globally
            new webpack.HotModuleReplacementPlugin(),

            // Print more readable module names in the browser console on HMR updates
            new webpack.NamedModulesPlugin(),
        ]
    } );
    // console.log( JSON.stringify( config.module.rules, null, 2 ) );
    // return config;
};
