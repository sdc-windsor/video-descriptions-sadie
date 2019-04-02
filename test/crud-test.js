const chai = require('chai');
const expect = chai.expect;
const { validateComment } = require('./../server/validation.js')
const faker = require('faker');

const goodComment1 = { video_id: 100, user_id: 100, comment: 'I live in a garbage can. It is not so bad.' };
const badComment1 = { video_id: 100, user_id: 'dog', comment: 3};
const badComment2 = { video_id: 'dog', user_id: 100, comment: 3};
const badComment3 = { video_id: 100, user_id: 100, comment: faker.lorem.words(710)};

describe('Validate Comments', function () {
  it('should return true for valid inputs for a new comment', function () {
    const { video_id, user_id, comment } = goodComment1;
    expect(validateComment(video_id, user_id, comment)).to.be.true;
  });

  it('should not accept non numeric user_ids', function() {
    const { video_id, user_id, comment } = badComment1;
    expect(validateComment(video_id, user_id, comment)).to.be.false;
  })

  it('should not accept non numeric video_ids', function() {
    const { video_id, user_id, comment } = badComment2;
    expect(validateComment(video_id, user_id, comment)).to.be.false;
  })

  it('should not accept too long comments', function() {
    const { video_id, user_id, comment } = badComment3;
    expect(validateComment(video_id, user_id, comment)).to.be.false;
  })

});
