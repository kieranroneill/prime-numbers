import axios from 'axios';
import Promise from 'bluebird';
import { CircularProgress, Snackbar } from 'material-ui';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

// Styles.
import styles from './PrimeTable.css';

class PrimeTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            isErrorShowing: false,
            primes: null,
            size: PrimeTable.toSize(props.size)
        };
    }

    componentDidMount() {
        this.getPrimeNumbers();
    }

    componentWillReceiveProps(props) {
        this.setState({ size: PrimeTable.toSize(props.size) });
    }

    createErrorText() {
        return (
            <div>Error</div>
        );
    }

    createPrimeTable() {
        const length = this.state.primes.length + 1;
        let html = '<table>';

        for(let i = 0; i < length; i++) {
            html += '<tr>';

            html += '<td>';
            html += (i > 0) ? this.state.primes[i - 1] : '';
            html += '</td>';

            for(let j = 1; j < length; j++) {
                html += '<td>';
                html += (i > 0) ? (this.state.primes[i - 1] * this.state.primes[j - 1]) : this.state.primes[j - 1];
                html += '</td>';
            }

            html += '</tr>';
        }

        html += '</table>';

        return (
            <div
                dangerouslySetInnerHTML={{ __html: html }}
                styleName="table" />
        );
    }

    getPrimeNumbers() {
        const url = '/api/primes?size=' + this.state.size;
        const promise = new Promise(resolve => this.setState({ isLoading: true }, () => resolve()));

        return promise
            .then(() => axios.get(url))
            .then(result => this.setState({ isLoading: false, isErrorShowing: false, primes: result.data }))
            .catch(() => this.setState({ isLoading: false, isErrorShowing: true, primes: null }));
    }

    onTryAgainTouchTap() {
        this.getPrimeNumbers();
    }

    /**
     * Convenient function for converting the size to a valid number.
     * @param size the size to convert.
     * @returns {number} a valid size integer or 10.
     */
    static toSize(size) {
        return isNaN(size) ? 10 : Math.round(parseInt(size));
    }

    render() {
        return(
            <div styleName="container">
                { this.state.isLoading ? <CircularProgress size={ 80 } /> : null }
                { this.state.primes ? this.createPrimeTable() : null }
                { this.state.isErrorShowing ? this.createErrorText() : null }
                <Snackbar
                    open={ this.state.isErrorShowing }
                    message="Shall we try that again?"
                    action="Try Again"
                    onActionTouchTap={ this.onTryAgainTouchTap.bind(this) }
                />
            </div>
        );
    }
}

PrimeTable.propTypes = {
    size: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]) // String or number.
};

export default CSSModules(PrimeTable, styles);
export { PrimeTable as PrimeTableTest }; // Export for testing.
