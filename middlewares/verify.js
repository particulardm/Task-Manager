const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const secretKey = process.env.SECRET;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey
};

passport.use(new Strategy(options, (payload, done) => {
  
  return done(null, payload);
}));

const verify = passport.authenticate('jwt', { session: false });

module.exports = verify;