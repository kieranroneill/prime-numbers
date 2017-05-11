import { requestByMethod } from '../../test/helpers';

const route = '/';

describe('server', () => {
    describe('serving html', function() {
        it('should serve a HTML document at the base route', function(done) {
            requestByMethod('GET', route)
                .expect(200)
                .end((error, response) => {
                    expect(error).to.equal(null);

                    expect(response.type).to.equal('text/html');

                    done();
                });
        });
    });
});
