// Helpers.
import { requestByMethod } from '../../../test/helpers';

// Route.
import PrimeNumberRoute from './PrimeNumberRoute';

// Utilities.
import { errors } from '../utilities/error.util';

const endpoint = '/api/primes';

describe('routes/PrimeNumberRoute', () => {
    const firstTenPrimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];

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
                .to.deep.equal(firstTenPrimes); // First 10 primes.
        });

        it('should return an array of 1000 primes', () => {
            const size = 1000;
            const result = PrimeNumberRoute.getPrimes(size);

            expect(result).to.be.an('array')
                .to.be.lengthOf(size);
        });

        it('should return an array of 20,000 primes', () => {
            const size = 20000;
            const result = PrimeNumberRoute.getPrimes(size);

            expect(result).to.be.an('array')
                .to.be.lengthOf(size);
        });

        it('should return an array of 100,000 primes', () => {
            const size = 100000;
            const result = PrimeNumberRoute.getPrimes(size);

            expect(result).to.be.an('array')
                .to.be.lengthOf(size);
        });

        it('should return an array of 200,000 primes', () => {
            const size = 200000;
            const result = PrimeNumberRoute.getPrimes(size);

            expect(result).to.be.an('array')
                .to.be.lengthOf(size);
        });
    });

    describe('segmentedSieve()', () => {
        it('should return no primes if the maximum is below the first prime', () => {
            const result = PrimeNumberRoute.segmentedSieve(0, 1);

            expect(result).to.be.an('array')
                .to.be.empty;
        });

        it('should return no primes if the minimum exceeds the maximum', () => {
            const result = PrimeNumberRoute.segmentedSieve(5, 1);

            expect(result).to.be.an('array')
                .to.be.empty;
        });

        it('should return the first prime', () => {
            const result = PrimeNumberRoute.segmentedSieve(0, 2);

            expect(result).to.be.an('array')
                .to.be.lengthOf(1)
                .to.include(2);
        });

        it('should return the first prime for the same ranges', () => {
            const result = PrimeNumberRoute.segmentedSieve(2, 2);

            expect(result).to.be.an('array')
                .to.be.lengthOf(1)
                .to.include(2);
        });

        it('should return the first 10 primes in 30', () => {
            const result = PrimeNumberRoute.segmentedSieve(0, 30);

            expect(result).to.be.an('array')
                .to.deep.equal(firstTenPrimes);
        });
    });
});
