import { createRequestError, errors, getExpressValidationErrors } from '../utilities/error.util';

export default class PrimeNumberRoute {
    constructor(router) {
        this.router = router;
    }

    registerRoutes() {
        this.router
            .route('/prime-number')
            .get((request, response, next) => {
                let validationErrors;

                request.checkQuery('prime', errors.PRIME_NUMBER_REQUIRED).notEmpty();

                validationErrors = request.validationErrors();

                if(validationErrors) {
                    return next(createRequestError(400, getExpressValidationErrors(validationErrors)));
                }

                response.json([]);
            });
    }
}
