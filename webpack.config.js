const path = require( 'path' );

function buildConfig() {
    const devServer = process.env.npm_lifecycle_event === 'start';
    const configFile = devServer ? 'dev-server' : process.env[ 'NODE_ENV' ];
    const options = {
        extractCss: !devServer,
        nodeEnv: process.env[ 'NODE_ENV' ],
        outputPath: path.resolve( __dirname, './dist' ),
        publicPath: ''
    };
    return require( `./config/webpack.${configFile}.js` )( options )
}

module.exports = buildConfig;
