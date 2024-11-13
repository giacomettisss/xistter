const userInMemoryRepository = require('./userInMemoryRepository');
// const userSQLiteRepository = require('./userSQLiteRepository');
const userMySQLRepository = require('./userMySQLRepository');

class RepositoryFactory {
  static getUserRepository() {
    const repoType = process.env.REPO_TYPE || 'memory';
    console.log(`[API User - RepositoryFactory] Repository type selected: ${repoType}`);

    switch (repoType) {
      // case 'sqlite':
      //   return userSQLiteRepository;
      case 'mysql':
        console.log("[API User - RepositoryFactory] Returning MySQL repository");
        return userMySQLRepository;
      default:
        console.log("[API User - RepositoryFactory] Returning In-Memory repository");
        return userInMemoryRepository;
    }
  }
}

module.exports = RepositoryFactory;
