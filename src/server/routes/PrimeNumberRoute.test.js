// Helpers.
import { requestByMethod } from '../../../test/helpers';

// Utilities.
import { errors } from '../utilities/error.util';

const route = '/api/prime-number';

describe('routes/PrimeNumberRoute', () => {
    describe('GET /prime-number', () => {
        it('should return a 400 if no prime number is supplied', done => {
            requestByMethod('GET', route)
                .expect(400)
                .end((error, response) => {
                    expect(error).to.equal(null);

                    expect(response.body).to.be.an('object');
                    expect(response.body).to.have.property('errors')
                        .to.be.an('array')
                        .to.include(errors.PRIME_NUMBER_REQUIRED);

                    done();
                });
        });
    });
});
