import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

// Styles.
import styles from './PrimeTable.css';

class PrimeTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            size: PrimeTable.toSize(props.size)
        };
    }

    componentWillReceiveProps(props) {
        this.setState({ size: PrimeTable.toSize(props.size) });
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
            <div>Table goes here!</div>
        );
    }
}

PrimeTable.propTypes = {
    size: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]) // String or number.
};

export default CSSModules(PrimeTable, styles);
export { PrimeTable as PrimeTableTest }; // Export for testing.
