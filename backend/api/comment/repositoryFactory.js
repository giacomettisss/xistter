const commentInMemoryRepository = require('./commentInMemoryRepository');
const commentSQLiteRepository = require('./commentSQLiteRepository');
const commentPostgreSQLRepository = require('./commentPostgreSQLRepository');

class RepositoryFactory {
  static getCommentRepository() {
    const repoType = process.env.REPO_TYPE || 'memory';
    switch (repoType) {
//      case 'sqlite':
//        return commentSQLiteRepository;
//      case 'postgresql':
//        return commentPostgreSQLRepository;
      default:
        return commentInMemoryRepository;
    }
  }
}

module.exports = RepositoryFactory;