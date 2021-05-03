import { UserService } from './UserService';
import bcrypt from 'bcrypt-nodejs';
import { UnauthorizedError } from 'routing-controllers';

jest.mock('../../DB');

jest.mock('../UserDBModel', () => {
  return {
    UserDBModel: {
      findOne: jest.fn(),
      create: jest.fn(),
    },
  };
});

describe('User Service', () => {
  beforeEach(() => {
    delete process.env.JWT_SECRET;
    delete process.env.TOKEN_EXPIRY;
  });
  describe('#createUser', () => {
    const username = 'work@email.com';
    const password = 'password';
    const hashPassword = 'hash-password';
    const fullName = 'Mavericks SuperAdmin';
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it('should create a user with correct values', async () => {
      const expectedUser = {
        id: 1,
        email: username,
        password: hashPassword,
        status: 'ACTIVE',
        fullName,
      };
      const userDBModelMock = require('../UserDBModel').UserDBModel;
      userDBModelMock.create.mockResolvedValueOnce(expectedUser);

      await new UserService().createUser(username, password, fullName);

      expect(userDBModelMock.create).toBeCalledWith(
        {
          email: username,
          fullName,
          status: 'ACTIVE',
          password: expect.anything(),
        },
        { transaction: expect.anything() },
      );
      expect(
        bcrypt.compareSync(
          password,
          userDBModelMock.create.mock.calls[0][0].password,
        ),
      ).toBeTruthy();

      const txn = userDBModelMock.create.mock.calls[0][1].transaction;
      expect(txn.commit).toBeCalled();
    });

    it('should rollback if User creation is failed', async () => {
      const userDBModelMock = require('../UserDBModel').UserDBModel;
      userDBModelMock.create.mockRejectedValueOnce(new Error());

      await expect(
        new UserService().createUser(username, password, fullName),
      ).rejects.toEqual(new Error('Error While saving the User record'));

      const txn = userDBModelMock.create.mock.calls[0][1].transaction;
      expect(txn.rollback).toBeCalled();
    });

    it('should create a user with given role', async () => {
      const expectedUser = {
        id: 1,
        email: username,
        password: hashPassword,
        status: 'ACTIVE',
        fullName,
      };
      const userDBModelMock = require('../UserDBModel').UserDBModel;
      userDBModelMock.create.mockResolvedValueOnce(expectedUser);

      await new UserService().createUser(
        username,
        password,
        fullName,
      );

      // expect(permDBModelMock.create).toBeCalledWith(
      //   {
      //     userId: 1,
      //     orgId: orgId,
      //     roleType,
      //   },
      //   { transaction: expect.anything() },
      // );
    });
  });

  describe('#getByUsername', () => {
    it('should return a user for a given username', async () => {
      const username = 'work@email.com';
      const user = {
        id: 1,
        email: username,
        fullName: 'first last',
        status: 'ACTIVE',
        password: 'hashed-pwd',
      };
      const userDBModelMock = require('../UserDBModel').UserDBModel;
      userDBModelMock.findOne.mockResolvedValueOnce(user);

      await expect(new UserService().getByUsername(username)).resolves.toEqual(
        user,
      );
    });
    it('should return null if given username does not exist', async () => {
      const username = 'work@email.com';
      const userDBModelMock = require('../UserDBModel').UserDBModel;
      userDBModelMock.findOne.mockResolvedValueOnce(null);

      await expect(
        new UserService().getByUsername(username),
      ).resolves.toBeNull();
    });
  });

  describe('#authenticate', () => {
    const username = 'work@email.com';
    const password = 'password';
    const fullName = 'Test Full Name';
    const hashPassword = bcrypt.hashSync(password);

    it('should return user for valid username and password', async () => {
      process.env.JWT_SECRET = 'sampleSecret';
      process.env.TOKEN_EXPIRY = '10s';
      const user = {
        id: 1,
        email: username,
        fullName: fullName,
        password: hashPassword,
      };
      const userDBModelMock = require('../UserDBModel').UserDBModel;
      userDBModelMock.findOne.mockResolvedValueOnce(user);

      await expect(
        new UserService().authenticate(username, password),
      ).resolves.toEqual({
        id: 1,
        email: username,
        token: expect.anything(),
        fullName: fullName,
      });
    });

    it('should throw a UnAuthorised Error for invalid password', async () => {
      process.env.JWT_SECRET = 'sampleSecret';
      process.env.TOKEN_EXPIRY = '10s';
      const user = {
        id: 1,
        email: username,
        fullName: fullName,
        status: 'ACTIVE',
        password: hashPassword,
      };
      const userDBModelMock = require('../UserDBModel').UserDBModel;
      userDBModelMock.findOne.mockResolvedValueOnce(user);

      await expect(
        new UserService().authenticate(username, 'invalid-password'),
      ).rejects.toEqual(new UnauthorizedError('Invalid Credentials'));
    });

    it('should throw a UnAuthorised Error for invalid username', async () => {
      process.env.JWT_SECRET = 'sampleSecret';
      process.env.TOKEN_EXPIRY = '10s';
      const userDBModelMock = require('../UserDBModel').UserDBModel;
      userDBModelMock.findOne.mockResolvedValueOnce(null);

      await expect(
        new UserService().authenticate('invalid-username', password),
      ).rejects.toEqual(new UnauthorizedError('Invalid Credentials'));
    });
  });
});
