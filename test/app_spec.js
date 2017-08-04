'use strict';

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

const expect = chai.expect;

chai.use(chaiHttp);

describe('App', function() {
  describe('/api/version', function() {
    it('responds with status 200', function(done) {
      chai.request(app).get('/api/version').end(function(err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
  });
});
