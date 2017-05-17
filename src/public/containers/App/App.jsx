import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
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
                <div className="page">
                    <AppBar
                        showMenuIconButton={ false }
                        title="Prime Table"/>
                    <main styleName="main">
                        <PrimeTable />
                    </main>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default CSSModules(App, styles);
