const jwt = require('jsonwebtoken');
const path = require('path');
const { getDataFromFile, saveDataToFile } = require('../../utils');
const tokensPath = path.resolve(__dirname, '..', 'data', 'tokens.json');

class TokenService {
  generateToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {
      expiresIn: '24h',
    });
  }

  validateToken(token) {
    try {
      return jwt.verify(token, process.env.ACCESS_SECRET_KEY);
    } catch (error) {
      return null;
    }
  }

  async saveTokenToFile(userId, token) {
    const tokens = await getDataFromFile(tokensPath);
    const tokenData = tokens.find((token) => token.userId === userId);
    if (tokenData) {
      tokenData.token = token;
      return await saveDataToFile(tokensPath, [...tokens, tokenData]);
    }

    await saveDataToFile(tokensPath, [...tokens, { userId, token }]);
  }

  async removeToken(token) {
    const tokens = await getDataFromFile(tokensPath);
    const newTokens = tokens.filter((item) => item.token !== token);
    await saveDataToFile(tokensPath, newTokens);
  }
}

module.exports = new TokenService();
