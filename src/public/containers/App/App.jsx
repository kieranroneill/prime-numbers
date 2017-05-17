import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

// Styles.
import styles from './App.css';

// Components.
import PrimeTable from '../../components/PrimeTable/PrimeTable';

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <main styleName="main">
                    <h1 styleName="title">Prime Table</h1>
                    <PrimeTable />
                </main>
            </MuiThemeProvider>
        );
    }
}

export default CSSModules(App, styles);
