import { Strategy as LocalStrategy } from 'passport-local';
import UserService from '../../../services/user.service';
import Boom from '@hapi/boom';
import bcrypt from 'bcrypt';
import AuthService from '../../../services/auth.service';

const authService = new AuthService();

const strategy = new LocalStrategy(
  {
    usernameField: 'identifier',
    passwordField: 'password'
  },
  async (identifier, password, done) => {
    try {
      const user = await authService.getUser(identifier, password);
      return done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

export default strategy;
