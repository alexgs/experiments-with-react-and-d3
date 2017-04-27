import React from 'react';
import ReactDom from 'react-dom';
import Streamograph from './Streamograph';
import './stylesheets/app.scss';

// TODO 1. Add button ot transition between layers
// TODO 2. Verify that SVG is not getting updated when the component gets new props

class AppContainer extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            height: 500,
            k: 10,
            m: 200,
            n: 20,
            width: 960
        };
    }

    render() {
        return (
            <div>
                <h1>Experiments in React and D3</h1>
                <Streamograph
                    height={ this.state.height }
                    k={ this.state.k }
                    m={ this.state.m }
                    n={ this.state.n }
                    width={ this.state.width }
                />
            </div>
        );
    }
}

ReactDom.render( <AppContainer />, document.getElementById( 'app-root' ) );
