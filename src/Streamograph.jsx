import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

let priv = {};

class Streamograph extends React.Component {

    shouldComponentUpdate() {
        // Never update; let D3 control the DOM for this component
        return false;
    }

    componentDidMount() {
        this.drawGraph();
    }

    /**
     * Draws the "streamograph" graph. Adapted from
     * https://bl.ocks.org/mbostock/4060954
     */
    drawGraph() {
        priv.stack = d3.stack()
            .keys( d3.range( this.props.n ) )
            .offset( d3.stackOffsetWiggle );

        priv.displayLayer = priv.stack(
            d3.transpose(
                d3.range( this.props.n )
                    .map( () => bumps( this.props.m, this.props.k ) )
            )
        );
        priv.hiddenLayer = priv.stack(
            d3.transpose(
                d3.range( this.props.n )
                    .map( () => bumps( this.props.m, this.props.k ) )
            )
        );
        priv.allLayers = priv.displayLayer.concat( priv.hiddenLayer );

        const svg = d3.select( this.svg );

        const x = d3.scaleLinear()
            .domain( [ 0, this.props.m - 1 ] )
            .range( [ 0, this.props.width ] );

        const y = d3.scaleLinear()
            .domain( [
                d3.min( priv.allLayers, stackMin ),
                d3.max( priv.allLayers, stackMax )
            ] )
            .range( [ this.props.height, 0 ] );

        const z = d3.interpolateCool;

        const area = d3.area()
            .x( ( d, i ) => x( i ) )
            .y0( d => y( d[ 0 ] ) )
            .y1( d => y( d[ 1 ] ) );

        svg.selectAll( 'path' )
            .data( priv.displayLayer )
            .enter().append( 'path' )
            .attr( 'd', area )
            .attr( 'fill', () => z( Math.random() ) );

        function stackMax( layer ) {
            return d3.max( layer, d => d[ 1 ] );
        }

        function stackMin( layer ) {
            return d3.min( layer, d => d[ 0 ] );
        }

        function transition() {
            let t;
            t = priv.hiddenLayer;
            priv.hiddenLayer = priv.displayLayer;
            priv.displayLayer = t;

            d3.selectAll( 'path' )
                .data( priv.displayLayer )
                .transition()
                .duration( 2500 )
                .attr( 'd', area );
        }

        // Inspired by Lee Byron’s test data generator.
        function bumps( n, m ) {
            const a = [];
            let i;
            for ( i = 0; i < n; ++i ) a[ i ] = 0;
            for ( i = 0; i < m; ++i ) bump( a, n );
            return a;
        }

        function bump( a, n ) {
            const x = 1 / (0.1 + Math.random()),
                y = 2 * Math.random() - 0.5,
                z = 10 / (0.1 + Math.random());
            for ( let i = 0; i < n; i++ ) {
                let w = (i / n - y) * z;
                a[ i ] += x * Math.exp( -w * w );
            }
        }
    }

    render() {
        return (
            <div>
                <p>Streamograph</p>
                <svg
                    ref={ element => { this.svg = element } }
                    width={ this.props.width }
                    height={ this.props.height }
                />
            </div>
        );
    }
}

Streamograph.propTypes = {
    height: PropTypes.number.isRequired,
    k: PropTypes.number.isRequired,
    m: PropTypes.number.isRequired,
    n: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
};

export default Streamograph;
