import React from 'react';
import * as d3 from 'd3';
import Streamograph from './Streamograph';

let priv = { };

class StreamContainer extends React.Component {
    constructor( props ) {
        // Component initialization
        super( props );
        this.state = {
            height: 500,
            k: 10,
            m: 200,
            n: 20,
            width: 960
        };

        // Create stacks for the "streamograph"
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

    shouldComponentUpdate() {
        // Never update; let D3 control the DOM for this component
        return false;
    }

    render() {
        return (
            <Streamograph
                height={ this.state.height }
                m={ this.state.m }
                stack={ priv.displayLayer }
                width={ this.state.width }
            />
        );
    }
}

export default StreamContainer;
