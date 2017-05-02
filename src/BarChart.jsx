import Immutable from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';

class BarChart extends React.Component {
    shouldComponentUpdate() {
        // Never update; let D3 control the DOM for this component
        return false;
    }

    render() {
        console.log( '>>> Executing BarChart.render() <<<' );

        return (
            <pre style={{ display: 'none' }} >
                { JSON.stringify( this.props.data.toJSON(), null, 2 ) }
            </pre>
        );
    }
}

BarChart.propTypes = {
    data: PropTypes.instanceOf( Immutable.Map ).isRequired
};

export default BarChart;
