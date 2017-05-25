import _ from 'lodash';

import { createRequestError, errors, getExpressValidationErrors } from '../utilities/error.util';

export default class PrimeNumberRoute {
    constructor(router) {
        this.router = router;
    }

    /**
     * Gets n number of primes.
     * @param size the amount of primes to find.
     * @returns {Array} an array of primes of length n.
     */
    static getPrimes(size = 0) {
        let start;
        let primes = [];

        for (let i = 0; i < size; i++) {
            start = (primes[primes.length - 1] + 1) || 0; // Get the start of the segment.
            primes = primes.concat(PrimeNumberRoute.segmentedSieve(start, (start + size)));

            i = primes.length - 1; // Increase the index to the amount of primes we have.
        }

        return primes.slice(0, size);
    }

    registerRoutes() {
        this.router
            .route('/primes')
            .get((request, response, next) => {
                let validationErrors;

                request.checkQuery('size', errors.SIZE_REQUIRED).notEmpty();
                request.checkQuery('size', errors.INVALID_NUMBER).isInt();

                validationErrors = request.validationErrors();

                if(validationErrors) {
                    return next(createRequestError(400, getExpressValidationErrors(validationErrors)));
                }

                // Convert to integer.
                request.sanitizeQuery('size').toInt();

                response.json(PrimeNumberRoute.getPrimes(request.query.size));
            });
    }

    /**
     * Uses a segmented sieve of Eratosthenes to sieve the prime numbers between a range. The segment includes the min/max values.
     * @param min the lower range.
     * @param max the upper range.
     * @returns {Array} an array of primes within the range.
     */
    static segmentedSieve(min, max) {
        const primes = [];
        let limit, sieve;

        if(max < 2 || min > max) {
            return primes;
        }

        limit = Math.sqrt(max);
        sieve = _.map(Array(max + 1), () => true);

        // There are no primes below 2.
        if(min < 2) {
            min = 2;
        }

        // Mark the multiples as composites.
        for (let i = 2; i <= limit; i++) {
            if (sieve[i]) {
                for (let j = i * i; j <= max; j += i) {
                    sieve[j] = false;
                }
            }
        }

        // With all the composites sieved, add the primes to the result.
        for(let i = min; i <= max; i++) {
            if(sieve[i]) {
                primes.push(i);
            }
        }

        return primes;
    }
}
