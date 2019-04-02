const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('./../server/index.js');

chai.use(chaiHttp);

xdescribe('Integration Tests', function () {
  it("should get video description using video's id", (done) => {
    chai.request(app)
      .get('/descriptions/1')
      .end(function (err, res) {
        if (err) {
          console.error(err);
        }
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body[0].video_id).to.equal(1);
        done();
      })
  });
  it("should get no description for non-existent video", (done) => {
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


