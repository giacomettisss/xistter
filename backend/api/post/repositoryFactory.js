const postInMemoryRepository = require('./postInMemoryRepository');
const postSQLiteRepository = require('./postSQLiteRepository');
const postMySQLRepository = require('./postMySQLRepository');

class RepositoryFactory {
  static getPostRepository() {
    const repoType = process.env.REPO_TYPE || 'memory';

    switch (repoType) {
      case 'sqlite':
        console.log('PostRepository using SQLite')
        return postSQLiteRepository;
      case 'mysql':
        console.log('PostRepository using MySQL')
        return postMySQLRepository;
      default:
        console.log('PostRepository using Memory')
        return postInMemoryRepository;
    }
  }
}

module.exports = RepositoryFactory;
