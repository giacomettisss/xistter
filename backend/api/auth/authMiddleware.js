const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key'; // Lembre-se de manter o segredo em uma variável de ambiente em produção

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('[API Auth - authMiddleware.js] authHeader:', authHeader)
  const token = authHeader && authHeader.split(' ')[1];
  console.log('[API Auth - authMiddleware.js] token: ', token)

  if (!token) {
    console.log('[API Auth - authMiddleware.js] Access token is missing')
    return res.status(401).json({ message: 'Access token is missing' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.log('[API Auth - authMiddleware.js] Invalid or expired token:', err)
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
