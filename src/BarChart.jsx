import * as d3 from 'd3';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';

const getXScale = function( numColumns ) {
    const scaleFactor = 1;
    return d3.scaleLinear()
        .range( [ 0, numColumns * scaleFactor ] );
};

const getYScale = function( maxValue ) {
    return d3.scaleLinear()
        .domain( [ 0, maxValue ] );
};

class BarChart extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            height: 500,
            width: 960
        };
    }

    componentDidMount() {
        this.drawGraph();
    }

    drawGraph() {
        console.log( '=== Executing BarChart.drawGraph() ===' );

        const calcX = getXScale( this.props.data.size );
        const calcY = getYScale( 20 );
        const calcHeight = value => value;
        const calcWidth = () => 20;

        const chart = d3.select( this.svg ).append( 'g' );
        const bars = chart.selectAll( 'rect' )
            .data( this.props.data.toArray() );

        bars.enter()
            .append( 'rect' )
            .attr( 'class', 'bar' )
            .attr( 'x', d => calcX( d ) )
            .attr( 'y', d => calcY( d ) )
            .attr( 'height', d => calcHeight( d ) )
            .attr( 'width', d => calcWidth( d ) )
        ;
    }

    render() {
        console.log( '>>> Executing BarChart.render() <<<' );

        return (
            <div>
                <svg
                    ref={ element => { this.svg = element } }
                    width={ this.state.width }
                    height={ this.state.height }
                />
                <pre style={{ display: 'none' }} >
                    { JSON.stringify( this.props.data.toJSON(), null, 2 ) }
                </pre>
            </div>
        );
    }

    shouldComponentUpdate() {
        // Never update; let D3 control the DOM for this component
        return false;
    }
}

BarChart.propTypes = {
    data: PropTypes.instanceOf( Immutable.Map ).isRequired
};

export default BarChart;
