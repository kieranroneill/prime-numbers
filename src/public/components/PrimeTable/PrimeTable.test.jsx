import _ from 'lodash';
import React from 'react';

// Components.
import { PrimeTableTest } from './PrimeTable';

describe('<PrimeTable />', () => {
    beforeEach(function() {
        this.props = {
            size: 10
        };
    });

    afterEach(function() {
        this.props = _.noop();
    });

    describe('when mounting the component', function() {
        it('should use the default size (10) if the size prop is undefined', function() {
            let instance;

            this.props.size = _.noop(); // Set to undefined.

            instance = shallow(<PrimeTableTest { ...this.props } />).instance();

            expect(instance.state.size).to.be.equal(10);
        });

        it('should use the default size (10) if the size prop is not a number', function() {
            let instance;

            this.props.size = 'Seven (I am not really a number)';

            instance = shallow(<PrimeTableTest { ...this.props } />).instance();

            expect(instance.state.size).to.be.equal(10);
        });

        it('should use the specified size if the size prop is a number', function() {
            let instance;

            this.props.size = 20;

            instance = shallow(<PrimeTableTest { ...this.props } />).instance();

            expect(instance.state.size).to.be.equal(this.props.size);
        });

        it('should use an integer for the specified size', function() {
            let instance;

            this.props.size = 20.3787382783;

            instance = shallow(<PrimeTableTest { ...this.props } />).instance();

            expect(_.isInteger(instance.state.size)).to.be.true;
        });
    });
});
