const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_KEY;

const isAuth = (request, response, next) => {
  const token = request.cookies.authcookie;

  jwt.verify(token, SECRET, (error, user) => {
    if (error) {
      response.send(error.message);
    } else {
      const { id, username, exp } = user;

      if (Date.now() / 1000 >= exp) {
        response.clearCookie("authcookie");
        response.send("Session expired. Try to reconnect you.");
      }

      request.user = { id, username };
      next();
    }
  })
};

module.exports = isAuth;