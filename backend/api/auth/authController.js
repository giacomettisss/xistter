const jwt = require('jsonwebtoken');
const RepositoryFactory = require('../user/repositoryFactory');
const userRepository = RepositoryFactory.getUserRepository();

const JWT_SECRET = 'your_jwt_secret_key';
const TOKEN_EXPIRATION = '1h';

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;
    console.log('[authController.js] login requested:', req.body)
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const result = await userRepository.getUserByEmail(email);
    const user = result[0]
    console.log('[authController.js] user:', user)
    console.log('[authController.js] user.password:', user.password)
    console.log('[authController.js] password:', password)
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
    res.json({ token });
  }

  async refreshToken(req, res) {
    const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const newToken = jwt.sign({ userId: decoded.userId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
      res.json({ token: newToken });
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  }

  async logout(req, res) {
    res.json({ message: 'Logged out successfully' });
  }
}

module.exports = new AuthController();
