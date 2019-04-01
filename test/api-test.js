const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const { Pool, Client } = require('pg');
const config = require('./../config.js');
const app = require('./../server/index.js');

chai.use(chaiHttp);

describe('CRUD', function (done) {

  describe('Descriptions', function () {

    describe('/GET/', function () {
      it("should get video description using video's id", () => {
        chai.request(app)
          .get('/descriptions/1')
          .end(function (err, res) {
            if (err) {
              console.error(err);
            }
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            console.log(res.body)
            // expect(res.body[0].video_id).to.equal(1);
            done();
          })
      });
      it("should get no description for non-existent video", () => {
        chai.request(app)
          .get('/descriptions/taco')
          .end(function (err, res) {
            if (err) {
              console.error(err);
            }
            expect(res).to.have.status(404);
            done();
          })
      });
    });
  })

  xdescribe('Comments', function () {

  });

});

