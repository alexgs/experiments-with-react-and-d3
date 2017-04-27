const path = require( 'path' );
const webpack = require( 'webpack' );
const webpackMerge = require( 'webpack-merge' );
const commonConfig = require( './webpack.common.js' );

module.exports = function( options ) {
    return webpackMerge( commonConfig( options ), {
        output: {
            filename: '[name].[chunkhash].js',
            publicPath: options[ 'publicPath' ],
        },

        plugins: [
            new webpack.optimize.CommonsChunkPlugin( {
                /**
                 * Put all imports exist from the node_modules directory into
                 * the "vendor" bundle.
                 */
                name: 'vendor',
                minChunks: function( module ) {
                    return module.context && module.context.indexOf( 'node_modules' ) !== -1;
                }
            } ),

            new webpack.optimize.CommonsChunkPlugin( {
                /**
                 * CommonChunksPlugin will now extract all the common modules
                 * from vendor and main bundles. However, there are no more
                 * common modules between them. Thus, we end up with just the
                 * runtime code included in the manifest file.
                 */
                name: 'manifest'
            } ),

            // This Plugin is needed for backwards compatibility with certain old(er) loaders
            // new webpack.LoaderOptionsPlugin( {
            //     minimize: true,
            //     debug: false
            // } ),

            new webpack.optimize.UglifyJsPlugin( {
                mangle: false,
                comments: false
            } )
        ]
    } );
};
