import React from 'react';
import ReactDom from 'react-dom';
import Streamograph from './Streamograph';
import './stylesheets/app.scss';

class AppContainer extends React.Component {
    render() {
        return (
            <div>
                <h1>Experiments in React and D3</h1>
                <Streamograph/>
            </div>
        );
    }
}

ReactDom.render( <AppContainer />, document.getElementById( 'app-root' ) );
