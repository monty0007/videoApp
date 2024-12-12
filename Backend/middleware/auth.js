// middleware/auth.js
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ error: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Attach decoded user info to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(400).json({ error: 'Invalid token' });
  }
};

module.exports = { authenticate };
