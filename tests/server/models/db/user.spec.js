/* global describe it xit */
const { expect } = require('chai');
const db = require('../../../../src/server/models/db');

const User = db.models.user;

describe('User model', () => {
  describe('attributes', () => {
    let testUser;

    beforeEach(() => User.build(
      {
        username: 'nick',
        email: 'nick@example.com',
        password: 'password',
      })
      .save()
      .then((user) => {
        testUser = user;
      }));

    afterEach(() => User.destroy({ where: {} }));

    it('should have a username attribute', () => {
      expect(testUser.username).to.exist; // eslint-disable-line
      expect(testUser.username).to.equal('nick');
    });

    it('should have an email attribute', () => {
      expect(testUser.email).to.exist; // eslint-disable-line
      expect(testUser.email).to.equal('nick@example.com');
    });

    it('should have password attribute', () => {
      expect(testUser.password).to.exist; // eslint-disable-line
    });
  });

  describe('', () => {
    it('', () => {
      expect(true).to.be.equal(true);
    });
  })
});
