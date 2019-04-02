const chai = require('chai');
const expect = chai.expect;
const { validateComment, validateDescription } = require('./../server/validation.js')
const faker = require('faker');

describe('Validate Comments', function () {
  const goodComment1 = { video_id: 100, user_id: 100, comment: 'I live in a garbage can. It is not so bad.' };
  const badComment1 = { video_id: 100, user_id: 'dog', comment: 3 };
  const badComment2 = { video_id: 'dog', user_id: 100, comment: 3 };
  const badComment3 = { video_id: 100, user_id: 100, comment: faker.lorem.words(710) };

  it('should return true for valid inputs for a new comment', function () {
    const { video_id, user_id, comment } = goodComment1;
    expect(validateComment(video_id, user_id, comment)).to.be.true;
  });

  it('should not accept non numeric user_ids', function () {
    const { video_id, user_id, comment } = badComment1;
    expect(validateComment(video_id, user_id, comment)).to.be.false;
  })

  it('should not accept non numeric video_ids', function () {
    const { video_id, user_id, comment } = badComment2;
    expect(validateComment(video_id, user_id, comment)).to.be.false;
  })

  it('should not accept too long comments', function () {
    const { video_id, user_id, comment } = badComment3;
    expect(validateComment(video_id, user_id, comment)).to.be.false;
  })

});

describe('Validate Descriptions', function () {

  const goodDescription1 = { video_id: 100, description: 'I live in a garbage can. It is not so bad.' , categories: ['Animation', 'Comedy']};
  const badDescription1 = { video_id: 'dog', description: 'I live in a garbage can. It is not so bad.' , categories: ['Animation', 'Comedy']};;
  const badDescription2 = { video_id: 100, description: faker.lorem.words(1100), categories: ['Animation', 'Comedy']};
  const badDescription3 = { video_id: 100, description: 'I live in a garbage can. It is not so bad.' , categories: ['Poop', 'Comedy']};;

  it('should return true for valid description', function () {
    const {video_id, description, categories} = goodDescription1;
    expect(validateDescription(video_id, description, categories)).to.be.true;
  })

  it('should not accet non numeric video id', function () {
    const {video_id, description, categories} = badDescription1;
    expect(validateDescription(video_id, description, categories)).to.be.false;
  })

  it('should not accet too long description', function () {
    const {video_id, description, categories} = badDescription2;
    expect(validateDescription(video_id, description, categories)).to.be.false;
  })

  it('should not accet bad categories', function () {
    const {video_id, description, categories} = badDescription3;
    expect(validateDescription(video_id, description, categories)).to.be.false;
  })
})
