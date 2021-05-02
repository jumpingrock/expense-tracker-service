import * as jwt from 'jsonwebtoken';

export default {
  validToken: jwt.sign(
    {
      username: 'username',
      id: 1,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.TOKEN_EXPIRY,
    },
  ),
  invalidToken: 'dummyToken',
};
