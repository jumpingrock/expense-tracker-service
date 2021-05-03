import chaiHttp from 'chai-http';
import chai from 'chai';
import bcrypt from 'bcrypt-nodejs';
import { ExpenseTrackerApp } from '../../index';

jest.mock('../../DB');

jest.mock('../UserDBModel', () => {
  return {
    UserDBModel: {
      findOne: jest.fn(),
    },
  };
});

chai.use(chaiHttp);
describe('User Controller', () => {
  const app = ExpenseTrackerApp.create();
  describe('auth', () => {
    const username = 'work@email.com';
    const password = 'password';
    const hashPassword = bcrypt.hashSync(password);
    const fullName = 'Mavericks SuperAdmin';
    beforeEach(() => {
      process.env.JWT_SECRET = 'sampleSecret';
      process.env.TOKEN_EXPIRY = '10s';
    });
    afterEach(() => {
      delete process.env.JWT_SECRET;
      delete process.env.TOKEN_EXPIRY;
    });
    it('should return successfully authorise for valid username and password', async () => {
      const expectedUser = {
        id: 1,
        email: username,
        password: hashPassword,
        status: 'ACTIVE',
        fullName,
      };
      const userDBModelMock = require('../UserDBModel').UserDBModel;
      userDBModelMock.findOne.mockResolvedValueOnce(expectedUser);

      const expectedResponse = {
        token: expect.anything(),
        email: username,
        fullName,
      };

      await expect(
        chai
          .request(app)
          .post('/user/auth')
          .set('content-type', 'application/json')
          .send({
            username,
            password,
          }),
      ).resolves.toMatchObject({
        status: 200,
        body: expectedResponse,
      });
    });

    it('should return 401 unauthorised response when password is invalid', async () => {
      const expectedResponse = {
        errorMessage: 'Invalid Credentials',
      };
      const expectedUser = {
        id: 1,
        email: username,
        password: hashPassword,
        status: 'ACTIVE',
        fullName,
      };
      const userDBModelMock = require('../UserDBModel').UserDBModel;
      userDBModelMock.findOne.mockResolvedValueOnce(expectedUser);

      await expect(
        chai
          .request(app)
          .post('/user/auth')
          .set('content-type', 'application/json')
          .send({
            username,
            password: 'invalid-password',
          }),
      ).resolves.toMatchObject({
        status: 401,
        body: expectedResponse,
      });
    });

    it('should return 401 unauthorised response when username is invalid', async () => {
      const expectedResponse = {
        errorMessage: 'Invalid Credentials',
      };
      const userDBModelMock = require('../UserDBModel').UserDBModel;
      userDBModelMock.findOne.mockResolvedValueOnce(null);

      await expect(
        chai
          .request(app)
          .post('/user/auth')
          .set('content-type', 'application/json')
          .send({
            username,
            password,
          }),
      ).resolves.toMatchObject({
        status: 401,
        body: expectedResponse,
      });
    });

    it('should return 400 bad request error when username is not an email value.', async () => {
      const expectedResponse = {
        errorMessage: 'Invalid request params.',
      };

      await expect(
        chai
          .request(app)
          .post('/user/auth')
          .set('content-type', 'application/json')
          .send({
            username: 'not-an-email',
            password,
          }),
      ).resolves.toMatchObject({
        status: 400,
        body: expectedResponse,
      });
    });

    it('should return 400 bad request error when username is not present.', async () => {
      const expectedResponse = {
        errorMessage: 'Invalid request params.',
      };

      await expect(
        chai
          .request(app)
          .post('/user/auth')
          .set('content-type', 'application/json')
          .send({
            password,
          }),
      ).resolves.toMatchObject({
        status: 400,
        body: expectedResponse,
      });
    });

    it('should return 400 bad request error when password is not present.', async () => {
      const expectedResponse = {
        errorMessage: 'Invalid request params.',
      };

      await expect(
        chai
          .request(app)
          .post('/user/auth')
          .set('content-type', 'application/json')
          .send({
            username,
          }),
      ).resolves.toMatchObject({
        status: 400,
        body: expectedResponse,
      });
    });

    it('should return 500 server error when an unknown server error occurs.', async () => {
      const expectedResponse = {
        errorMessage: 'Oops! Something went wrong.',
      };
      const userDBModelMock = require('../UserDBModel').UserDBModel;
      userDBModelMock.findOne.mockRejectedValueOnce(new Error('some error'));

      await expect(
        chai
          .request(app)
          .post('/user/auth')
          .set('content-type', 'application/json')
          .send({
            username,
            password,
          }),
      ).resolves.toMatchObject({
        status: 500,
        body: expectedResponse,
      });
    });
  });
});
