const LikeMySQLRepository = require('./likeMySQLRepository');

class RepositoryFactory {
  static getLikeRepository() {
    return LikeMySQLRepository;
  }
}

module.exports = RepositoryFactory;
