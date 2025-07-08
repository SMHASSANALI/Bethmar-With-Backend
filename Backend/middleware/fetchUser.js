const jwt = require('jsonwebtoken')
const User = require('../modals/User.schema.js')

const fetchUser = async (req, res, next) => {
  const bearerHeader = req.headers['authorization']
  const cookieToken = req.cookies.jwt
  const headerToken = bearerHeader && bearerHeader.split(' ')[1]

  const token = cookieToken || headerToken

  if (!token) {
    return res.status(401).send('Access Denied: No token provided')
  }

  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(verify.id).select('-password')
    if (!user) {
      return res.status(401).send('User Not Found')
    }

    req.user = user
    next()
  } catch (error) {
    console.error('Token verification error:', error)
    return res.status(401).send('Invalid Token')
  }
}

module.exports = fetchUser
