import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

chai.should();
chai.use(chaiHttp);
// Test error 404
describe('Error 404 test', () => {
  it('it should handle error 404', (done) => {
    chai.request(app)
      .get('/notexist')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
