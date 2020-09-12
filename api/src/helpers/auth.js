const jwt = require('jsonwebtoken');

const secret = process.env.SHARED_SERVICES_JWT_SECRET;

/**
 * Signs a JWT token to use as a Bearer Token in an Authorization header
 *
*/
function signJWT () {
  return jwt.sign({ retire: 'fearlessly' }, secret);
}

/**
 * Verifies a JWT token
 *
 * @param {string} token - the token passed in the authorization header
*/
function verifyJWT (token) {
  try {
    const decodedToken = jwt.verify(token, secret);
    return decodedToken.retire === 'fearlessly';
  } catch (e) {
    console.log('JWT Verification Error: ', e);
    return false;
  }
}

module.exports = { signJWT, verifyJWT };
