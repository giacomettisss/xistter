const RepositoryFactory = require('./repositoryFactory');
const likeRepository = RepositoryFactory.getLikeRepository();

const likePost = async (req, res) => {
  const userId = req.user.id;
  const { postId } = req.params;

  if (!postId) {
    return res.status(400).json({ error: 'Post ID is required' });
  }

  try {
    await likeRepository.likePost(userId, postId);
    res.json({ message: 'Post liked successfully' });
  } catch (error) {
    console.error('Error in likePost:', error);
    res.status(500).json({ error: 'Error liking post' });
  }
};

const unlikePost = async (req, res) => {
  const userId = req.user.id;
  const { postId } = req.params;

  if (!postId) {
    return res.status(400).json({ error: 'Post ID is required' });
  }

  try {
    await likeRepository.unlikePost(userId, postId);
    res.json({ message: 'Post unliked successfully' });
  } catch (error) {
    console.error('Error in unlikePost:', error);
    res.status(500).json({ error: 'Error unliking post' });
  }
};

const getPostLikes = async (req, res) => {
  const { postId } = req.params;

  if (!postId) {
    return res.status(400).json({ error: 'Post ID is required' });
  }

  try {
    const likes = await likeRepository.getPostLikes(postId);
    res.json({ likes });
  } catch (error) {
    console.error('Error in getPostLikes:', error);
    res.status(500).json({ error: 'Error retrieving likes' });
  }
};

module.exports = {
  likePost,
  unlikePost,
  getPostLikes,
};
