const RepositoryFactory = require('./repositoryFactory');
const followerRepository = RepositoryFactory.getFollowerRepository();

const followUser = async (req, res) => {
  const { followerId, followingId } = req.body;

  if (!followerId || !followingId) {
    return res.status(400).json({ error: 'Follower ID and Following ID are required' });
  }

  if (followerId === followingId) {
    return res.status(400).json({ error: 'You cannot follow yourself' });
  }

  try {
    await followerRepository.followUser(followerId, followingId);
    res.json({ message: 'User followed successfully' });
  } catch (error) {
    console.error('Error in followUser:', error);
    res.status(500).json({ error: 'Error following user' });
  }
};

const unfollowUser = async (req, res) => {
  const { followerId, followingId } = req.body;

  if (!followerId || !followingId) {
    return res.status(400).json({ error: 'Follower ID and Following ID are required' });
  }

  try {
    await followerRepository.unfollowUser(followerId, followingId);
    res.json({ message: 'User unfollowed successfully' });
  } catch (error) {
    console.error('Error in unfollowUser:', error);
    res.status(500).json({ error: 'Error unfollowing user' });
  }
};

const getFollowers = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const followers = await followerRepository.getFollowers(userId);
    res.json({ followers });
  } catch (error) {
    console.error('Error in getFollowers:', error);
    res.status(500).json({ error: 'Error retrieving followers' });
  }
};

const getFollowing = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const following = await followerRepository.getFollowing(userId);
    res.json({ following });
  } catch (error) {
    console.error('Error in getFollowing:', error);
    res.status(500).json({ error: 'Error retrieving following' });
  }
};

module.exports = {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
};
