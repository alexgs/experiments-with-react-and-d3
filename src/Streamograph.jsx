import React from 'react';
import * as d3 from 'd3';

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

        const svg = d3.select("svg"),
            width = +svg.attr( "width" ),
            height = +svg.attr( "height" );

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

        svg.selectAll("path")
            .data(layers0)
            .enter().append("path")
            .attr("d", area)
            .attr("fill", function() { return z(Math.random()); });

        function stackMax(layer) {
            return d3.max(layer, function(d) { return d[1]; });
        }

        function stackMin(layer) {
            return d3.min(layer, function(d) { return d[0]; });
        }

        function transition() {
            let t;
            d3.selectAll("path")
                .data((t = layers1, layers1 = layers0, layers0 = t))
                .transition()
                .duration(2500)
                .attr("d", area);
        }

        // Inspired by Lee Byron’s test data generator.
        function bumps(n, m) {
            const a = [];
            let i;
            for (i = 0; i < n; ++i) a[i] = 0;
            for (i = 0; i < m; ++i) bump(a, n);
            return a;
        }

        function bump(a, n) {
            const x = 1 / (0.1 + Math.random()),
                y = 2 * Math.random() - 0.5,
                z = 10 / (0.1 + Math.random());
            for ( let i = 0; i < n; i++) {
                let w = (i / n - y) * z;
                a[i] += x * Math.exp(-w * w);
            }
        }


    }

    render() {
        return (
            <div>
                <p>Streamograph</p>
                <svg
                    ref={ element => { this.svg = element } }
                    width="960"
                    height="500"
                />
            </div>
        );
    }
}

Streamograph.propTypes = {

};

export default Streamograph;
