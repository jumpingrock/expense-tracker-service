import { UserDBModel } from '../UserDBModel';
import UserStatus from '../UserStatus';
import bcrypt from 'bcrypt-nodejs';
import { AuthResponse } from '../controller/AuthResponse';
import * as jwt from 'jsonwebtoken';
import { UnauthorizedError } from 'routing-controllers';
import { DB } from '../../DB';

export class UserService {
  async getByUsername(username: string): Promise<UserDBModel> {
    return await UserDBModel.findOne({
      where: { email: username },
    });
  }

  async createUser(
    username: string,
    password: string,
    fullName: string,
  ): Promise<UserDBModel> {
    const hashedPassword = bcrypt.hashSync(password);
    const transaction = await DB.getInstance().transaction();
    try {
      const user = await UserDBModel.create(
        {
          email: username,
          password: hashedPassword,
          status: UserStatus.active,
          fullName: fullName,
        },
        { transaction },
      );
      await transaction.commit();
      return user;
    } catch (error) {
      await transaction.rollback();
      throw new Error('Error While saving the User record');
    }
  }

  async authenticate(
    username: string,
    password: string,
  ): Promise<AuthResponse> {
    const user = await this.getByUsername(username);
    if (!user) throw new UnauthorizedError('Invalid Credentials');

    const isValid = bcrypt.compareSync(password, user.password);

    if (!isValid) throw new UnauthorizedError('Invalid Credentials');

    const token = this.generateToken(username, user);

    return new AuthResponse(user, token);
  }

  private generateToken(username: string, user: UserDBModel) {
    const JWT_SECRET = process.env.JWT_SECRET;
    const TOKEN_EXPIRY = process.env.TOKEN_EXPIRY;
    const token = jwt.sign(
      {
        username: username,
        id: user.id,
      },
      JWT_SECRET,
      {
        expiresIn: TOKEN_EXPIRY,
      },
    );
    return token;
  }
}
