import { UserDBModel } from '../UserDBModel';

export class AuthResponse {
  constructor(
    user: UserDBModel,
    token: string,
  ) {
    this.id = user.id
    this.fullName = user.fullName;
    this.email = user.email;
    this.token = token;
  }

  private readonly id: number;
  private readonly fullName: string;
  private readonly email: string;
  private readonly token: string;
}
