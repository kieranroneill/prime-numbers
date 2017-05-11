import { createRequestError } from './error.util';

describe('utilities/error', () => {
    describe('createRequestError()', function() {
        it('should throw the default error if nothing is defined', function() {
            const error = createRequestError();

            expect(error).to.be.an('error');

            expect(error).to.have.property('name');
            expect(error.name)
                .to.be.a('string')
                .to.equal('RequestError');

            expect(error).to.have.property('status');
            expect(error.status)
                .to.be.a('number')
                .to.equal(400);

            expect(error).to.have.property('errors');
            expect(error.errors)
                .to.be.an('array')
                .to.be.empty;

            expect(error).to.have.property('message');
            expect(error.message)
                .to.be.a('string')
                .to.be.empty;
        });

        it('should throw a bad request error if the status code is not a valid request error code', function() {
            const error = createRequestError(123);

            expect(error).to.be.an('error');

            expect(error).to.have.property('status');
            expect(error.status)
                .to.be.a('number')
                .to.equal(400);
        });

        it('should throw an error with the correct parameters', function() {
            const message = 'An error occurred while displaying the previous error';
            const error = createRequestError(401, [message]);

            expect(error).to.be.an('error');

            expect(error).to.have.property('status');
            expect(error.status)
                .to.be.a('number')
                .to.equal(401);

            expect(error).to.have.property('errors');
            expect(error.errors)
                .to.be.an('array')
                .to.include(message);
        });
    });
});
