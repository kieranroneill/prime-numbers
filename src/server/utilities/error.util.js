import _ from 'lodash';

class RequestError extends Error {
    constructor(status, errors, message) {
        super(message);

        this.name = 'RequestError';
        this.status = status;
        this.errors = errors;
    }
}

export const errors = {
    INVALID_NUMBER: 'Um, this is not a valid number.',
    SIZE_REQUIRED: 'Yo! Let me see some digits.'
};

/**
 * Creates a extended error that is used for http request errors.
 * @param status a HTTP request error code.
 * @param errors an array of error messages.
 * @param message the message to provide the standard Error class.
 * @return {RequestError} a valid RequestError.
 */
export function createRequestError(status, errors, message) {
    // If status code is unknown or not an error, use a 'Bad Request' status.
    if(!status || status < 400 || status >= 600) {
        status = 400;
    }

    if(!_.isArray(errors)) {
        errors = [];
    }

    return new RequestError(status, errors, message);
}

/**
 * Converts the errors returned from the express-validatior into consumable errors.
 * @param errors express-validator errors
 */
export function getExpressValidationErrors(errors) {
    return _.map(errors, object => object.msg);
}
