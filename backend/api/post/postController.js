const RepositoryFactory = require('./repositoryFactory');
const postRepository = RepositoryFactory.getPostRepository();

const addPost = async (req, res) => {
  const { userId, content } = req.body;

  if (!userId || !content) {
    return res.status(400).json({ error: 'User ID and content are required' });
  }

  try {
    const postId = await postRepository.addPost(userId, content);
    
    if (!postId) {
      return res.status(500).json({ error: 'Failed to retrieve the post ID' });
    }

    res.json({ message: 'Post added successfully', postId });
  } catch (error) {
    console.error('Error in addPost:', error);
    res.status(500).json({ error: 'Error adding post' });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const [posts, info] = await postRepository.getAllPosts();
    res.json(posts);
  } catch (error) {
    console.error('Error in getAllPosts:', error);
    res.status(500).json({ error: 'Error fetching posts' });
  }
};

const getPostById = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await postRepository.getPostById(parseInt(postId, 10));
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error('Error in getPostById:', error);
    res.status(500).json({ error: 'Error fetching post' });
  }
};

const deletePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const result = await postRepository.deletePost(parseInt(postId, 10));
    if (result === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error in deletePost:', error);
    res.status(500).json({ error: 'Error deleting post' });
  }
};

module.exports = { addPost, getAllPosts, getPostById, deletePost };
