const followerMySQLRepository = require('./followerMySQLRepository');

class RepositoryFactory {
  static getFollowerRepository() {
    const repoType = process.env.REPO_TYPE || 'memory';
    console.log(`[API Follower - RepositoryFactory] Repository type selected: ${repoType}`);

    switch (repoType) {
      case 'sqlite':
          console.log("[API Follower - RepositoryFactory] Returning SQLite repository");
        return followerSQLiteRepository;
      case 'mysql':
        console.log("[API Follower - RepositoryFactory] Returning MySQL repository");
        return followerMySQLRepository;
      default:
        console.log("[API Follower - RepositoryFactory] Returning In-Memory repository");
        return followerInMemoryRepository;
    }
  }
}

module.exports = RepositoryFactory;
