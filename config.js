// config.js
require("dotenv").config();

module.exports = {
  accessTokenSecretKey: process.env.AccessTokenSecretKey,
  refreshTokenSecretKey: process.env.RefreshTokenSecretKey,
};
