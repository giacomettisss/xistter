const { v4: uuidv4 } = require('uuid');

const users = [];

class UserInMemoryRepository {
  async getAll() {
    return users;
  }

  async getById(id) {
    return users.find(user => user.id === id);
  }

  async add(user) {
    const newUser = {
      id: uuidv4(),
      user: user.user,
      email: user.email,
      password: user.senha,
      created_at: new Date().toISOString(),
    };
    users.push(newUser);
    return newUser;
  }

  async update(id, userData) {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...userData };
      return users[index];
    }
    return null;
  }

  async delete(id) {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
      return users.splice(index, 1)[0];
    }
    return null;
  }
}

module.exports = new UserInMemoryRepository();
