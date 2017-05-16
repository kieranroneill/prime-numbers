import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { RaisedButton, TextField } from 'material-ui';
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

// Styles.
import styles from './App.css';

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <main styleName="main">
                    <div styleName="sizeInput">
                        <TextField
                            hintText="Enter a size for your table" />
                        <RaisedButton
                            label="Get Table"
                            primary={ true }/>
                    </div>
                </main>
            </MuiThemeProvider>
        );
    }
}

export default CSSModules(App, styles);
