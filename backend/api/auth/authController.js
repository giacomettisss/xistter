const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const RepositoryFactory = require('../user/repositoryFactory');
const userRepository = RepositoryFactory.getUserRepository();

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRATION = '1h';

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;
    console.log('[authController.js] login requested:', req.body);
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const result = await userRepository.getUserByEmail(email);
    const user = result[0];
    console.log('[authController.js] user:', user);2

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });

    console.log('TOKEN', token)

    // Definir o token como um cookie HTTP-Only
    res.cookie('token', token, {
      httpOnly: true, // Impede o acesso via JavaScript no frontend
      // secure: process.env.NODE_ENV === 'production', // Define como true em produção para HTTPS
      secure: false, // Defina como true em produção (HTTPS)
      // sameSite: 'strict', // Protege contra CSRF
      sameSite: 'lax', // 'strict', 'lax'
      maxAge: 3600000, // 1 hora
    });

    // Retornar uma resposta de sucesso
    res.json({ message: 'Login realizado com sucesso' });
  }

  async register(req, res) {
    const { email, password, confirmPassword } = req.body;
    console.log('[authController.js] register requested:', req.body);
    
    // Validação básica
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'Email, password and confirm password are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Verificar se o usuário já existe
    const existingUser = await userRepository.getUserByEmail(email);
    if (existingUser.length > 0) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Criar novo usuário
    try {
      const newUserId = await userRepository.addUser(email, email, password);
      console.log('[authController.js] newUserId:', newUserId);

      // Gerar token JWT para o novo usuário
      const token = jwt.sign({ userId: newUserId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });

      // Definir o token como um cookie HTTP-Only
      res.cookie('token', token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        secure: false,
        sameSite: 'lax',
        maxAge: 3600000,
      });

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('[authController.js] Error registering user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
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
      
      // Definir o novo token como um cookie HTTP-Only
      res.cookie('token', newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600000,
      });

      res.json({ message: 'Token refreshed successfully' });
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  }

  async logout(req, res) {
    // Limpar o cookie do token
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    res.json({ message: 'Logged out successfully' });
  }
}

module.exports = new AuthController();



// const jwt = require('jsonwebtoken');
// const RepositoryFactory = require('../user/repositoryFactory');
// const userRepository = RepositoryFactory.getUserRepository();

// const JWT_SECRET = 'your_jwt_secret_key';
// const TOKEN_EXPIRATION = '1h';

// class AuthController {
//   async login(req, res) {
//     const { email, password } = req.body;
//     console.log('[authController.js] login requested:', req.body)
    
//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required' });
//     }

//     const result = await userRepository.getUserByEmail(email);
//     const user = result[0]
//     console.log('[authController.js] user:', user)
//     console.log('[authController.js] user.password:', user.password)
//     console.log('[authController.js] password:', password)
//     if (!user || user.password !== password) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
//     res.json({ token });
//   }

//   async refreshToken(req, res) {
//     const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
//     if (!token) {
//       return res.status(400).json({ message: 'Token is required' });
//     }

//     try {
//       const decoded = jwt.verify(token, JWT_SECRET);
//       const newToken = jwt.sign({ userId: decoded.userId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
//       res.json({ token: newToken });
//     } catch (err) {
//       res.status(401).json({ message: 'Invalid token' });
//     }
//   }

//   async logout(req, res) {
//     res.json({ message: 'Logged out successfully' });
//   }
// }

// module.exports = new AuthController();
