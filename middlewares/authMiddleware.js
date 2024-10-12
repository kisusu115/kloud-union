const passport = require('passport');

const authenticateSession = passport.authenticate('session');

module.exports = {
    authenticateSession,
};
