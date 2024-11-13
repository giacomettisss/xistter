const postInMemoryRepository = require('./postInMemoryRepository');
const postSQLiteRepository = require('./postSQLiteRepository');
const postMySQLRepository = require('./postMySQLRepository');

class RepositoryFactory {
  static getPostRepository() {
    const repoType = process.env.REPO_TYPE || 'memory';
    console.log(`[API Post - RepositoryFactory] Repository type selected: ${repoType}`);

    switch (repoType) {
      case 'sqlite':
          console.log("[API Post - RepositoryFactory] Returning SQLite repository");
        return postSQLiteRepository;
      case 'mysql':
        console.log("[API Post - RepositoryFactory] Returning MySQL repository");
        return postMySQLRepository;
      default:
        console.log("[API Post - RepositoryFactory] Returning In-Memory repository");
        return postInMemoryRepository;
    }
  }
}

module.exports = RepositoryFactory;
