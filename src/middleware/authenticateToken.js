const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, JWT_SECRET, (err, decodedUser) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });


    if (!decodedUser) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = decodedUser; // Attach the decoded user object to the request
    next();
  });
}

module.exports = authenticateToken;
