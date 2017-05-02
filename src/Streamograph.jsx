import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class Streamograph extends React.Component {

    shouldComponentUpdate() {
        // Never update; let D3 control the DOM for this component
        return false;
    }

    componentDidMount() {
        this.drawGraph();
    }

    componentWillReceiveProps( nextProps ) {
        if ( this.props.stack !== nextProps.stack ) {
            // Save the new stack
            this.props.stack = nextProps.stack;

            // Update the graph
            const svg = d3.select( this.svg );
            svg.selectAll( 'path' )
                .data( this.props.stack )
                .transition()
                .duration( 2500 )
                .attr( 'd', area );
        }
    }

    /**
     * Draws the "streamograph" graph. Adapted from
     * https://bl.ocks.org/mbostock/4060954
     */
    drawGraph() {
        const svg = d3.select( this.svg );

        const x = d3.scaleLinear()
            .domain( [ 0, this.props.m - 1 ] )
            .range( [ 0, this.props.width ] );

        const y = d3.scaleLinear()
            .domain( [
                d3.min( this.props.stack, stackMin ),
                d3.max( this.props.stack, stackMax )
            ] )
            .range( [ this.props.height, 0 ] );

        const z = d3.interpolateCool;

        const area = d3.area()
            .x( ( d, i ) => x( i ) )
            .y0( d => y( d[ 0 ] ) )
            .y1( d => y( d[ 1 ] ) );

        svg.selectAll( 'path' )
            .data( this.props.stack )
            .enter().append( 'path' )
            .attr( 'd', area )
            .attr( 'fill', () => z( Math.random() ) );

        function stackMax( layer ) {
            return d3.max( layer, d => d[ 1 ] );
        }

        function stackMin( layer ) {
            return d3.min( layer, d => d[ 0 ] );
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
    m: PropTypes.number.isRequired,
    stack: PropTypes.any.isRequired,
    width: PropTypes.number.isRequired
};

export default Streamograph;
