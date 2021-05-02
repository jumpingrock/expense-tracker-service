import passport from 'passport';
import passportJwt from 'passport-jwt';
import { UserService } from '../user/service/UserService';

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    },
    async function (jwtToken, done) {
      const user = await new UserService().getByUsername(jwtToken.username);
      return done(undefined, user, jwtToken);
    },
  ),
);
