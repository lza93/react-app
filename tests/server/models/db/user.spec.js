/* global describe it xit */
const { expect } = require('chai');
const sinon = require('sinon');
const db = require('../../../../src/server/models/db');

const User = db.models.user;

describe('User model', () => {
  let testUser;

  beforeEach(async () => {
    testUser = await User.create(
      {
        username: 'nick',
        email: 'nick@example.com',
        password: 'password',
      },
    );
    return testUser;
  });

  afterEach(() => User.destroy({ where: {} }));

  describe('attributes', () => {
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
      expect(testUser.password).to.not.equal('password');
    });
  });

  describe('instance methods', () => {
    describe('checkPassword', () => {
      it('should check to see whether a given password is correct', async () => {
        expect(typeof testUser.checkPassword).to.equal('function');
        const isCorrectPassword = await testUser.checkPassword('password');
        expect(isCorrectPassword).to.equal(true);
      });

      it('should return false for incorrect password', async () => {
        expect(typeof testUser.checkPassword).to.equal('function');
        const isCorrectPassword = await testUser.checkPassword('notACorrectPassword');
        expect(isCorrectPassword).to.equal(false);
      });
    });

    describe('hashPassword', () => {
      it('should set the instance password to the hashed password', async () => {
        const NEW_PASSWORD = 'this is a test password';
        testUser.password = NEW_PASSWORD;
        const hashedPassword = await testUser.hashPassword();
        expect(testUser.password).to.equal(hashedPassword);
      });
    });
  });

  describe('hooks', () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      return;
    });

    afterEach(() => sandbox.restore());

    describe('beforeCreate hook', () => {
      it('should call hashPassword instance method', async () => {
        const hashPasswordStub = sandbox.stub(User.Instance.prototype, 'hashPassword')
                .returns(null);
        await User.create(
          {
            username: 'bobloblaw',
            email: 'bob.loblaw@law.blog',
            password: '1234556',
          },
        );
        expect(hashPasswordStub.calledOnce).to.be.equal(true);
      });
    });

    describe('beforeUpdate hook', () => {
      it('updates password when it changes', async () => {
        const hashPasswordStub = sandbox.stub(User.Instance.prototype, 'hashPassword')
                .returns(null);
        await testUser.update({password: 'newPassword'});
        expect(hashPasswordStub.calledOnce).to.be.equal(true);
      });

      it('doesn\'t update password if password doesn\'t change', async () => {
        const hashPasswordStub = sandbox.stub(User.Instance.prototype, 'hashPassword')
                .returns(null);
        await testUser.update({username: 'newUsername'});
        expect(hashPasswordStub.called).to.be.equal(false);
      });
    });
  });


});
