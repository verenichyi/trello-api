const defaultPort = 5000;
const tokenCookieOptions = {
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000,
};

const authResponses = {
  registration: 'has successfully been registered',
  login: 'has successfully logged in',
  logout: 'has successfully logged out',
};

const requestMethods = {
  options: 'OPTIONS',
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  patch: 'PATCH',
  delete: 'DELETE',
};

const timestampFormat = 'YYYY-MM-DD HH:mm:ss';

const salt = 3;

module.exports = {
  defaultPort,
  tokenCookieOptions,
  authResponses,
  requestMethods,
  timestampFormat,
  salt,
};
