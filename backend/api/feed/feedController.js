const RepositoryFactory = require('./repositoryFactory');
const feedRepository = RepositoryFactory.getFeedRepository();

const getFeed = async (req, res) => {
  const { userId } = req.params;
  let { page, limit } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 20;
  const offset = (page - 1) * limit;

  try {
    const feed = await feedRepository.getFeed(userId, offset, limit);
    res.json({ feed });
  } catch (error) {
    console.error('Error in getFeed:', error);
    res.status(500).json({ error: 'Error retrieving feed' });
  }
};

module.exports = {
  getFeed,
};
