import React from 'react';
import ReactDom from 'react-dom';
import * as d3 from 'd3';
import _ from 'lodash';
import Streamograph from './Streamograph';
import './stylesheets/app.scss';

// Inspired by Lee Byron’s test data generator.
const bumps = function(n, m) {
    const a = [];
    let i;
    for (i = 0; i < n; ++i) a[i] = 0;
    for (i = 0; i < m; ++i) bump(a, n);
    return a;
};

const bump = function(a, n) {
    const x = 1 / (0.1 + Math.random()),
        y = 2 * Math.random() - 0.5,
        z = 10 / (0.1 + Math.random());
    for ( let i = 0; i < n; i++) {
        let w = (i / n - y) * z;
        a[i] += x * Math.exp(-w * w);
    }
};

const generateStreamData = function( width, height) {
    const n = 20, // number of layers
        m = 200, // number of samples per layer
        k = 10; // number of bumps per layer

    const stack = d3.stack().keys( d3.range( n ) ).offset( d3.stackOffsetWiggle );
    let layers0 = stack( d3.transpose( d3.range( n ).map( function() {
            return bumps( m, k );
        } ) ) ),
        layers1 = stack( d3.transpose( d3.range( n ).map( function() {
            return bumps( m, k );
        } ) ) );
    const layers = layers0.concat( layers1 );

    const x = d3.scaleLinear()
        .domain( [ 0, m - 1 ] )
        .range( [ 0, width ] );

    const y = d3.scaleLinear()
        .domain( [ d3.min( layers, stackMin ), d3.max( layers, stackMax ) ] )
        .range( [ height, 0 ] );

    const z = d3.interpolateCool;

    const area = d3.area()
        .x( function( d, i ) {
            return x( i );
        } )
        .y0( function( d ) {
            return y( d[ 0 ] );
        } )
        .y1( function( d ) {
            return y( d[ 1 ] );
        } );

    return { area, layers, z }
};

const stackMax = function(layer) {
    return d3.max(layer, function(d) { return d[1]; });
};

const stackMin = function(layer) {
    return d3.min(layer, function(d) { return d[0]; });
};

class AppContainer extends React.Component {
    constructor( props ) {
        super( props );
        let svgParams = {
            width: 960,
            height: 500
        };
        this.state = _.merge(
            { },
            svgParams,
            generateStreamData( svgParams.width, svgParams.height )
        );
    }

    render() {
        return (
            <div>
                <h1>Experiments in React and D3</h1>
                <Streamograph
                    area={ this.state.area }
                    height={ this.state.height }
                    layers={ this.state.layers }
                    width={ this.state.width }
                    z={ this.state.z }
                />
            </div>
        );
    }
}

ReactDom.render( <AppContainer />, document.getElementById( 'app-root' ) );
