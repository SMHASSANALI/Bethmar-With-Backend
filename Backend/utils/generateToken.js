const jwt = require('jsonwebtoken')
require('dotenv').config()
const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ id: userId.toString() }, process.env.JWT_SECRET, {
    expiresIn: '15d'
  })
  res.cookie('jwt', token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict',
    secure: process.env.NODE_ENV === 'production'
  })
}

module.exports = generateTokenAndSetCookie
