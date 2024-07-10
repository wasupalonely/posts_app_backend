import { Strategy, ExtractJwt } from 'passport-jwt';
import env from '../../../config/config';

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.JWT_SECRET
};

const JwtStrategy = new Strategy(options, async (payload, done) => {
    return done(null, payload);
})

export default JwtStrategy