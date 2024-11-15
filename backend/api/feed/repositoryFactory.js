const FeedMySQLRepository = require('./feedMySQLRepository');

class RepositoryFactory {
  static getFeedRepository() {
    return FeedMySQLRepository;
  }
}

module.exports = RepositoryFactory;
