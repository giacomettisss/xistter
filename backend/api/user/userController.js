const RepositoryFactory = require('./repositoryFactory');
const userRepository = RepositoryFactory.getUserRepository();

class UserController {
  async getAllUsers(req, res) {
    const users = await userRepository.getAllUsers();
    res.json(users);
  }

  async getUserById(req, res) {
    const user = await userRepository.getUserById(req.params.id);
    user ? res.json(user) : res.status(404).json({ message: 'User not found' });
  }

  async getUserByEmail(req, res) {
    const user = await userRepository.getUserByEmail(req.params.email);
    user ? res.json(user) : res.status(404).json({ message: 'User not found' });
  }

  async createUser(req, res) {
    const { user, email, password } = req.body;
    console.log(req.body)
    if (!user || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const newUserId = await userRepository.addUser(user, email, password);
    res.status(201).json({ userId: newUserId });
  }

  async updateUserPassword(req, res) {
    const { password } = req.body;
    const updated = await userRepository.updateUserPassword(req.params.id, password);
    updated ? res.json({ message: 'User updated successfully' }) : res.status(404).json({ message: 'User not found' });
  }

  async deleteUser(req, res) {
    const deleted = await userRepository.deleteUser(req.params.id);
    deleted ? res.json({ message: 'User deleted successfully' }) : res.status(404).json({ message: 'User not found' });
  }
}

module.exports = new UserController();
