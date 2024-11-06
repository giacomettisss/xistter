const userInMemoryRepository = require('./userInMemoryRepository');
// const postSQLiteRepository = require('./postSQLiteRepository');
// const postPostgreSQLRepository = require('./postPostgreSQLRepository');

class RepositoryFactory {
  static getPostRepository() {
    const repoType = process.env.REPO_TYPE || 'memory';

    switch (repoType) {
      // case 'sqlite':
      //   return postSQLiteRepository;
      // case 'postgresql':
      //   return postPostgreSQLRepository;
      default:
        return userInMemoryRepository;
    }
  }
}

module.exports = RepositoryFactory;