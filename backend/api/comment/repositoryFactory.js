const commentInMemoryRepository = require('./commentInMemoryRepository');
const commentSQLiteRepository = require('./commentSQLiteRepository');
const commentPostgreSQLRepository = require('./commentMySQLRepository');

class RepositoryFactory {
  static getCommentRepository() {
    const repoType = process.env.REPO_TYPE || 'memory';
    console.log(`[API Comment - RepositoryFactory] Repository type selected: ${repoType}`);

    switch (repoType) {
      // case 'sqlite':
      //   console.log("[API Comment - RepositoryFactory] Returning SQLite repository");
      //   return commentSQLiteRepository;
      case 'mysql':
        console.log("[API Comment - RepositoryFactory] Returning MySQL repository");
        return commentPostgreSQLRepository;
      default:
        console.log("[API Comment - RepositoryFactory] Returning In-Memory repository");
        return commentInMemoryRepository;
    }
  }
}

module.exports = RepositoryFactory;
