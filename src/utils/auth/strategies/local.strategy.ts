import { Strategy as LocalStrategy } from 'passport-local';
import UserService from '../../../services/user.service';
import Boom from '@hapi/boom';
import bcrypt from 'bcrypt';

const userService = new UserService();

const strategy = new LocalStrategy(
  {
    usernameField: 'identifier',
    passwordField: 'password'
  },
  async (identifier, password, done) => {
    try {
      const user = await userService.getUserByIdentifier(identifier);
      
      if (!user) {
        return done(Boom.unauthorized('Invalid credentials'), false);
      }
      
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        return done(Boom.unauthorized('Invalid credentials'), false);
      }

      const { password: _, ...userWithoutPassword } = user.toObject()

      return done(null, userWithoutPassword);
    } catch (error) {
      done(error, false);
    }
  }
);

export default strategy;
