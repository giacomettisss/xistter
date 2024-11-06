const userRepository = require('./userInMemoryRepository');

class UserController {
  async getAllUsers(req, res) {
    const users = await userRepository.getAll();
    res.json(users);
  }

  async getUserById(req, res) {
    const user = await userRepository.getById(req.params.id);
    user ? res.json(user) : res.status(404).json({ message: 'User not found' });
  }

  async createUser(req, res) {
    const { usuario, email, senha } = req.body;
    if (!usuario || !email || !senha) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const newUser = await userRepository.add({ usuario, email, senha });
    res.status(201).json(newUser);
  }

  async updateUser(req, res) {
    const { usuario, email, senha } = req.body;
    const updatedUser = await userRepository.update(req.params.id, { usuario, email, senha });
    updatedUser ? res.json(updatedUser) : res.status(404).json({ message: 'User not found' });
  }

  async deleteUser(req, res) {
    const deletedUser = await userRepository.delete(req.params.id);
    deletedUser ? res.json(deletedUser) : res.status(404).json({ message: 'User not found' });
  }
}

module.exports = new UserController();
