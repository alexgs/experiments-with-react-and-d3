import React from 'react';
import ReactDom from 'react-dom';
import './stylesheets/app.scss';

class AppContainer extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello Awesome World!</h1>
                <pre>This is monospaced text.</pre>
            </div>
        );
    }
}

ReactDom.render( <AppContainer />, document.getElementById( 'app-root' ) );
