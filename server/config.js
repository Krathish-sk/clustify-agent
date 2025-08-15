module.exports = {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  saltRounds: parseInt(process.env.SALT_ROUNDS) || 12,
};
