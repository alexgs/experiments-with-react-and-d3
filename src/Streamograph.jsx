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

    /**
     * Draws the "streamograph" graph. Adapted from
     * https://bl.ocks.org/mbostock/4060954
     */
    drawGraph() {
        const svg = d3.select( "svg" );

        svg.selectAll("path")
            .data( this.props.layers )
            .enter().append("path")
            .attr( "d", this.props.area )
            .attr( "fill", () => this.props.z( Math.random() ) );

        // function transition() {
        //     let t;
        //     d3.selectAll("path")
        //         .data((t = layers1, layers1 = layers0, layers0 = t))
        //         .transition()
        //         .duration(2500)
        //         .attr("d", area);
        // }
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
    area: PropTypes.any.isRequired,
    height: PropTypes.number.isRequired,
    layers: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    z: PropTypes.func.isRequired
};

export default Streamograph;
