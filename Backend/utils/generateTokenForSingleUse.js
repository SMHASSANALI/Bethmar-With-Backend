const jwt = require('jsonwebtoken')

const generateTokenForSingleUse = userId => {
  const token = jwt.sign({ id: userId.toString() }, process.env.JWT_SECRET, {
    expiresIn: '360m'
  })
  return token
}

module.exports = generateTokenForSingleUse
