const pool = require('../../config/db');

class UserMySQLRepository {
  async addUser(name, email, password) {
    const [result] = await pool.query('CALL add_user(?, ?, ?);', [name, email, password]);
    const userId = result[0] && result[0][0].userId;
    return userId;
  }

  async getUserById(userId) {
    const [rows] = await pool.query('CALL get_user(?);', [userId]);
    return rows[0] || null;
  }

  async getUserByEmail(email) {
    const [rows] = await pool.query('CALL get_user_by_email(?);', [email]);
    return rows[0] || null;
  }

  async getAllUsers() {
    const [rows] = await pool.query('CALL get_users();');
    return rows[0];
  }

  async deleteUser(userId) {
    const [result] = await pool.query('CALL delete_user(?);', [userId]);
    return result.affectedRows;
  }

  async updateUserPassword(userId, password) {
    const [result] = await pool.query('CALL update_user_password(?, ?);', [userId, password]);
    return result.affectedRows;
  }
}

module.exports = new UserMySQLRepository();


// const postContentInput = document.getElementById("postContent");
// postContentInput.focus();