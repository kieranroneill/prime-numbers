import { createRequestError, errors, getExpressValidationErrors } from '../utilities/error.util';

export default class PrimeNumberRoute {
    constructor(router) {
        this.router = router;
    }

    /**
     * Gets the next prime number.
     * @param value the previous prime number, 0 or 1.
     * @returns {Number} returns the next prime number or null if value is not 0, 1 or a prime number.
     */
    static nextPrime(value) {
        let i, limit;

        // Generate the lower bound primes, because we know 'em!
        if(!value || value <= 2) {
            return ((value === 2) ? 3 : 2);
        }

        // If the number is an even number and not 2, use previous odd number!
        if((value > 2 && value % 2 === 0)) {
            value -= 1;
        }

        do {
            i = 3;
            value += 2; // We know that 2 is the only even prime number, so use the next odd.
            limit = Math.floor(Math.sqrt(value));

            // Check until we find a non-composite.
            while(i <= limit && (value % i > 0)) {
                i += 2;
            }
        }
        while(i <= limit);

        return value;
    }

    /**
     * Gets n number of primes.
     * @param size the amount of primes to find.
     * @returns {Array} an array of primes of length n.
     */
    static getPrimes(size = 0) {
        const result = [];
        let prime = 0;

        for (let i = 0; i < size; i++) {
            prime = PrimeNumberRoute.nextPrime(prime);

            result.push(prime);
        }

        return result;
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
}
