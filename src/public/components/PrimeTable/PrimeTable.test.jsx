import axios from 'axios';
import _ from 'lodash';
import React from 'react';

// Components.
import { PrimeTableTest } from './PrimeTable';

describe('<PrimeTable />', () => {
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];

    beforeEach(function() {
        this.props = {
            size: 10
        };

        this.axiosGetStub = stub(axios, 'get');
    });

    afterEach(function() {
        this.props = _.noop();

        this.axiosGetStub.restore();
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

    describe('when getting the prime numbers', function() {
        it('should show error text and snack bar if it fails', function(done) {
            const instance = shallow(<PrimeTableTest { ...this.props } />).instance();

            this.axiosGetStub.rejects(null);

            instance.getPrimeNumbers()
                .then(result => {
                    expect(result).to.be.undefined;
                    expect(instance.state.isLoading).to.be.false;
                    expect(instance.state.isErrorShowing).to.be.true;
                    expect(instance.state.primes).to.be.null;

                    done();
                });
        });

        it('should load with the default 10', function(done) {
            const instance = shallow(<PrimeTableTest { ...this.props } />).instance();

            this.axiosGetStub.resolves(primes);

            instance.getPrimeNumbers()
                .then(() => {
                    expect(instance.state.isLoading).to.be.false;
                    expect(instance.state.isErrorShowing).to.be.false;
                    expect(instance.state.primes).to.be.an('array')
                        .to.deep.equal(primes);

                    assert.calledWith(this.axiosGetStub, match('size=10'));

                    done();
                });
        });
    });
});
