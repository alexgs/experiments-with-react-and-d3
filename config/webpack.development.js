const webpackMerge = require( 'webpack-merge' );
const commonConfig = require( './webpack.common.js' );

module.exports = function( options ) {
    return webpackMerge( commonConfig( options ), {
        devtool: 'source-map',

        output: {
            filename: '[name].bundle.js',
            publicPath: options[ 'publicPath' ],
            sourceMapFilename: '[name].map'
        },

    } );
};
