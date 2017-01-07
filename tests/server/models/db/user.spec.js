/* global describe it xit */
const { expect } = require('chai');
const sinon = require('sinon');
const sinonAsPromised = require('sinon-as-promised');
const bcrypt = require('bcrypt');
const db = require('../../../../src/server/models/db');

const User = db.models.user;

describe('User model', () => {
  let testUser;
  let sandbox;
  beforeEach(async () => {
    testUser = await User.create(
      {
        username: 'nick',
        email: 'nick@example.com',
        password: 'password',
      },
    );
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
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
    });
    afterEach(() => {
      sandbox.restore();
    });

    describe('checkPassword', () => {
      it('should return true for correct password', async () => {
        expect(typeof testUser.checkPassword).to.equal('function');
        const isCorrectPassword = await testUser.checkPassword('password');
        expect(isCorrectPassword).to.equal(true);
      });

      it('should return false for incorrect password', async () => {
        expect(typeof testUser.checkPassword).to.equal('function');
        const isCorrectPassword = await testUser.checkPassword('notACorrectPassword');
        expect(isCorrectPassword).to.equal(false);
      });

      it('should return false if an error occurs', async () => {
        const originalCompare = bcrypt.compare;
        const error = new Error('test generated error');
        bcrypt.compare = (pw, pw2, func) => {
          func(error, 'something');
        };
        return await testUser.checkPassword('password')
          .then(() => { bcrypt.compare = originalCompare; }) // extra safety incase test passes
          .catch((err) => {
            bcrypt.compare = originalCompare; // NB! Reset bcrypt.compare to original method
            expect(err).to.equal(error);
          });
      });
    });

    describe('hashPassword', () => {
      it('should set the instance password to the hashed password', async () => {
        const NEW_PASSWORD = 'this is a test password';
        testUser.password = NEW_PASSWORD;
        const hashedPassword = await testUser.hashPassword();
        expect(testUser.password).to.equal(hashedPassword);
      });

      it('should reject with an error message if there is an error', async () => {
        const originalHash = bcrypt.hash;
        const error = new Error('test generated error');
        bcrypt.hash = (pw, iter, func) => {
          func(error, 'something');
        };
        return await testUser.hashPassword('password')
          .then(() => { bcrypt.hash = originalHash; }) // extra safety incase test passes
          .catch((err) => {
            bcrypt.hash = originalHash; // NB!! Reset bcrypt.compare to original method
            expect(err).to.equal(error);
          });
      });
    });
  });

  describe('hooks', () => {
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
