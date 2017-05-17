import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { grey300, purple500, white } from 'material-ui/styles/colors';
import { AppBar, IconButton } from 'material-ui';
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

// Styles.
import styles from './App.css';

// Components.
import PrimeTable from '../../components/PrimeTable/PrimeTable';
import GitHubSvgIcon from '../../components/GitHubSvgIcon/GitHubSvgIcon';

class App extends Component {
    render() {
        const iconElementRight = (
            <IconButton
                href="https://github.com/kieranroneill/prime-table"
                target="_blank"
                tooltip="Free as in speech"
                tooltipPosition="bottom-left"
                style={{ width: 48, height: 48 }}
                iconStyle={{ width: 24, height: 24 }}>
                <GitHubSvgIcon
                    color={ white }
                    hoverColor={ grey300 }
                    viewBox="0 0 16 16" />
            </IconButton>
        );

        return (
            <MuiThemeProvider>
                <div className="page">
                    <AppBar
                        iconElementRight={ iconElementRight }
                        showMenuIconButton={ false }
                        style={{ backgroundColor: purple500 }}
                        title="Prime Table"/>
                    <main styleName="main">
                        <PrimeTable />
                    </main>
                    <footer styleName="footer">
                        <p>{ 'Made with ❤ by Kieran O\'Neill' }</p>
                    </footer>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default CSSModules(App, styles);
