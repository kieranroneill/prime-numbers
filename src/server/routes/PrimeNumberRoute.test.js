// Helpers.
import { requestByMethod } from '../../../test/helpers';

// Route.
import PrimeNumberRoute from './PrimeNumberRoute';

// Utilities.
import { errors } from '../utilities/error.util';

const endpoint = '/api/primes';

describe('routes/PrimeNumberRoute', () => {
    describe('GET /primes', () => {
        it('should return a 400 if no size is supplied', done => {
            requestByMethod('GET', endpoint)
                .expect(400)
                .end((error, response) => {
                    expect(error).to.equal(null);

                    expect(response.body).to.be.an('object');
                    expect(response.body).to.have.property('errors')
                        .to.be.an('array')
                        .to.include(errors.SIZE_REQUIRED);

                    done();
                });
        });

        it('should return a 400 if the size is not a number', done => {
            const url = endpoint + '?size=not-a-number';

            requestByMethod('GET', url)
                .expect(400)
                .end((error, response) => {
                    expect(error).to.equal(null);

                    expect(response.body).to.be.an('object');
                    expect(response.body).to.have.property('errors')
                        .to.be.an('array')
                        .to.include(errors.INVALID_NUMBER);

                    done();
                });
        });

        it('should return a 200 with correct size of primes', done => {
            const size = 5;
            const url = endpoint + '?size=' + size;

            requestByMethod('GET', url)
                .expect(200)
                .end((error, response) => {
                    expect(error).to.equal(null);

                    expect(response.body).to.be.an('array')
                        .to.be.lengthOf(size);

                    done();
                });
        });
    });

    describe('getPrimes()', () => {
        it('should return an empty array when the input is undefined', () => {
            const result = PrimeNumberRoute.getPrimes();

            expect(result).to.be.an('array')
                .to.be.empty;
        });

        it('should return an empty array when the input is 0', () => {
            const result = PrimeNumberRoute.getPrimes(0);

            expect(result).to.be.an('array')
                .to.be.empty;
        });

        it('should return an array of 10 primes', () => {
            const size = 10;
            const result = PrimeNumberRoute.getPrimes(size);

            expect(result).to.be.an('array')
                .to.be.lengthOf(size)
                .to.deep.equal([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]); // First 10 primes.
        });

        it('should return an array of 100000 primes', () => {
            const size = 100000;
            const result = PrimeNumberRoute.getPrimes(size);

            expect(result).to.be.an('array')
                .to.be.lengthOf(size);
        });

        // it('should return an array of 1000000 primes', () => {
        //     const size = 1000000;
        //     const result = PrimeNumberRoute.getPrimes(size);
        //
        //     expect(result).to.be.an('array')
        //         .to.be.lengthOf(size);
        // });
    });

    describe('nextPrime()', () => {
        it('should default to 2 if the prime is undefined', () => expect(PrimeNumberRoute.nextPrime()).to.equal(2));

        it('should equal 2 if the prime is less 2', () => expect(PrimeNumberRoute.nextPrime(0)).to.equal(2));

        it('should equal 3 if the prime 2', () => expect(PrimeNumberRoute.nextPrime(2)).to.equal(3));

        it('should equal 29 if the prime 23', () => expect(PrimeNumberRoute.nextPrime(23)).to.equal(29));

        it('should equal 6700417 if the prime is 6700411', () => expect(PrimeNumberRoute.nextPrime(6700411))
            .to.equal(6700417));
    });
});
