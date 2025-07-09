const express = require('express')
const {
  login,
  register,
  resetPassword,
  logout,
  checkAuth
} = require('../controllers/Auth.controller.js')

const fetchUser = require('../middleware/fetchUser.js')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/reset-password', resetPassword)
router.post('/logout', logout)

router.get('/check-auth', checkAuth)

module.exports = router
