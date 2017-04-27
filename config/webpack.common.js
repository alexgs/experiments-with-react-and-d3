const ExtractTextPlugin = require( "extract-text-webpack-plugin" );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const path = require( 'path' );

module.exports = function( options ) {
    return {
        entry: {
            app: './src/index.jsx'
        },

        resolve: {
            extensions: [ '*', '.js', '.jsx' ]
        },

        module: {
            rules: [
                /**
                 * The "ExtractTextPlugin" doesn't work with HMR, and disabling it via its
                 * `disable` option doesn't appear to work. I came up with this configuration
                 * as a work-around.
                 */
                options.extractCss ? {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract( {
                        use: [
                            { loader: 'css-loader' },
                            { loader: 'sass-loader' }
                        ]
                    } )
                } : { },

                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: [ 'react' ]
                    }
                }
            ]
        },

        output: {
            path: options.outputPath,
        },

        plugins: [
            new HtmlWebpackPlugin( {
                template: './src/index.html'
            } ),

            new ExtractTextPlugin( {
                filename: "[name].[contenthash].css",
            } )
        ]
    };
};
