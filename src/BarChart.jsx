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
            data: Immutable.Map(),
            height: 400,
            width: 960
        };
    }

    componentWillMount() {
        this.setState( {
            data: this.props.data
        } );
    }

    componentDidMount() {
        this.drawGraph();
    }

    componentWillReceiveProps( nextProps ) {
        if ( nextProps.data !== this.state.data ) {
            console.log( '~~~ Bar Chart will receive new data: '
                + JSON.stringify( nextProps.data.toJSON(), null, 2 ) );
            this.setState( {
                data: nextProps.data
            } );

            // TODO (1) Correctly update or draw the new graph
            // TODO (2) Animate the transition
            this.drawGraph();
        }
    }

    drawGraph() {
        console.log( '=== Executing BarChart.drawGraph() ===' );

        // const calcX = getXScale( this.props.data.size );
        const calcX = function( index ) {
            return ( index * 25 ) + 10;
        };

        // const calcY = getYScale( 20 );
        const calcY = function( data, height ) {
            return height - ( data * 20 );
        };
        const calcHeight = value => value * 20;
        const calcWidth = () => 20;

        const chart = d3.select( this.svg ).append( 'g' );
        const bars = chart.selectAll( 'rect' )
            .data( this.state.data.toArray() );

        bars.enter()
            .append( 'rect' )
            .attr( 'class', 'bar' )
            .attr( 'x', ( d, i ) => calcX( i ) )
            .attr( 'y', d => calcY( d, this.state.height ) )
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
                <pre>
                    { JSON.stringify( this.state.data.toJSON(), null, 2 ) }
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
