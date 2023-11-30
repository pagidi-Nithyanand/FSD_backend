const jwt = require('jsonwebtoken')

module.exports = async function (req, res, next) {
  try {
    const token = req.header('x-token')

    if (!token) {
      return res.status(401).json({ message: 'No token' })
    }

    const decoded = await jwt.verify(token, 'jwtsecret')

    if (!decoded.user) {
      return res.status(401).json({ message: 'Invalid token' })
    }

    req.user = decoded.user
    next()
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error' })
  }
}
