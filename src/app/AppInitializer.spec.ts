import AppInitializer from './AppInitializer';

const mockCreateUser = jest.fn();
const mockGetByUsername = jest.fn();
jest.mock('./user/service/UserService', () => {
  return {
    UserService: jest.fn().mockImplementation(() => {
      return {
        createUser: mockCreateUser,
        getByUsername: mockGetByUsername,
      };
    }),
  };
});

describe('AppInitializer', () => {
  beforeEach(() => {
    mockCreateUser.mockClear();
    mockGetByUsername.mockClear();
    delete process.env.SUPER_ADMIN_USERNAME;
    delete process.env.SUPER_ADMIN_PWD;
  });
  it('should throw an error if super admin username is not provided', async () => {
    process.env.SUPER_ADMIN_PWD = 'password';
    await expect(AppInitializer.init()).rejects.toEqual(
      new Error('Invalid credentials for super admin'),
    );
  });

  it('should throw an error if super admin password is not provided', async () => {
    process.env.SUPER_ADMIN_USERNAME = 'user@email.com';
    await expect(AppInitializer.init()).rejects.toEqual(
      new Error('Invalid credentials for super admin'),
    );
  });

  it('Should create a user, if not exists', async () => {
    const password = 'password';
    const username = 'work@email.com';
    const fullName = 'Expense Tracker User';

    process.env.SUPER_ADMIN_PWD = password;
    process.env.SUPER_ADMIN_USERNAME = username;
    mockGetByUsername.mockResolvedValueOnce(null);
    mockCreateUser.mockResolvedValueOnce({});
    await AppInitializer.init();

    expect(mockCreateUser).toBeCalledWith(
      username,
      password,
      fullName,
    );
  });

  it('should not create a Super Admin user if already exists', async () => {
    const password = 'password';
    const username = 'work@email.com';
    process.env.SUPER_ADMIN_PWD = password;
    process.env.SUPER_ADMIN_USERNAME = username;
    mockGetByUsername.mockResolvedValueOnce({
      id: 1,
      email: username,
    });

    await AppInitializer.init();

    expect(mockCreateUser).not.toBeCalled();
  });
});
