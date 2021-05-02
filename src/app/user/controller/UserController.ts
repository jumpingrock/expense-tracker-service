import { Body, JsonController, Post } from 'routing-controllers';
import { UserService } from '../service/UserService';
import { AuthResponse } from './AuthResponse';
import { AuthRequest } from './AuthRequest';

@JsonController('/user')
export class UserController {
  @Post('/auth')
  authenticateUser(
    @Body({ type: AuthRequest }) userRequest: AuthRequest,
  ): Promise<AuthResponse> {
    return new UserService().authenticate(
      userRequest.username,
      userRequest.password,
    );
  }
}
