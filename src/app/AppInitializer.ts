import { UserService } from './user/service/UserService';

export default class AppInitializer {
  static async init() {
    const superAdminUsername = process.env.SUPER_ADMIN_USERNAME;
    const superAdminPassword = process.env.SUPER_ADMIN_PWD;
    if (!superAdminUsername || !superAdminPassword) {
      throw new Error('Invalid credentials for super admin');
    }

    const userService = new UserService();
    const user = await userService.getByUsername(superAdminUsername);
    if (!user) {
      await userService.createUser(
        superAdminUsername,
        superAdminPassword,
        'Expense Tracker User',
      );
    }
  }
}
