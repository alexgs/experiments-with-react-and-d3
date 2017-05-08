import Immutable from 'immutable';
import React from 'react';
import ReactDom from 'react-dom';
import _ from 'lodash';
import BarChart from './BarChart';
import './stylesheets/app.scss';

// TODO Verify that SVG is not getting updated when the component gets new props

const columnLabels = [
    'Homer Simpson',
    'Marge Simpson',
    'Bart Simpson',
    'Lisa Simpson',
    'Maggie Simpson',
    'Abe Simpson',
    'Blinky, the 3-eyed Fish',
    'Patty Bouvier',
    'Selma Bouvier',
    'Kent Brockman',
    'Carl Carlson',
    'Superintendent Chalmers',
    'Comic Book Guy',
    'Disco Stu',
    'Ned Flanders',
    'Professor Frink',
    'Barney Gumble',
    'Dr. Hibbert',
    'Krusty the Clown',
    'Lenny Leonard',
    'Reverend Lovejoy',
    'Otto Mann',
    'Troy McClure',
    'Nelson Muntz',
    'Apu Nahasapeemapetilon',
    'Sideshow Bob',
    'Principal Skinner',
    'Waylon Smithers',
    'Moe Szyslak',
    'Milhouse Van Houten',
    'Chief Wiggum',
    'Ralph Wiggum',
    'Rainier Wolfcastle'
].sort();

const generateData = function( numColumns = 10, minValue = 0, maxValue = 20 ) {
    if ( numColumns > columnLabels.length ) {
        numColumns = columnLabels;
    }

    let data = Immutable.Map();
    _.times( numColumns, index => {
        data = data.set( columnLabels[ index ], _.random( minValue, maxValue ) );
    } );

    return data;
};

class AppContainer extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            currentIndex: 0,
            data: Immutable.List( [ generateData( undefined, 1 ) ] ),
            height: 500,
            width: 960
        };
    }

    handleGenerateClick() {
        const newDataset = generateData();
        const currentIndex = this.state.currentIndex + 1;
        const data = this.state.data.push( newDataset );
        this.setState( {
            currentIndex: currentIndex,
            data: data
        } );
    }

    render() {
        let chartData = this.state.data.get( this.state.currentIndex );

        return (
            <div>
                <h1>Experiments in React and D3</h1>
                <BarChart data={ chartData } />
                <div>
                    <button
                        onClick={ this.handleGenerateClick.bind( this ) }
                        title="Generate and display a new dataset"
                    >
                        <i className="fa fa-refresh" aria-hidden="true"/>
                    </button>
                </div>
            </div>
        );
    }
}

ReactDom.render( <AppContainer />, document.getElementById( 'app-root' ) );
