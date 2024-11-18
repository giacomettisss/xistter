const RepositoryFactory = require('./repositoryFactory');
const postRepository = RepositoryFactory.getPostRepository();

const UserRepositoryFactory = require('../user/repositoryFactory');
const userRepository = UserRepositoryFactory.getUserRepository();

const addPost = async (req, res) => {
  console.log('[postController.js] - Running addPost')
  const { content } = req.body;
  const userId = req.userId
  console.log('[postController.js] - userId', userId)

  if (!userId || !content) {
    return res.status(400).json({ error: 'User ID and content are required' });
  }

  try {
    const postId = await postRepository.addPost(userId, content);

    if (!postId) {
      return res.status(500).json({ error: 'Failed to retrieve the post ID' });
    }

    res.json({ message: 'Post added successfully', postId });
    console.log('[postController.js] - Passed Successfully')
  } catch (error) {
    console.error('Error in addPost:', error);
    res.status(500).json({ error: 'Error adding post' });
  }
};

const deletePost = async (req, res) => {
  const { userId } = req.body;
  const { postId } = req.params;

  if (!userId || !postId) {
    return res.status(400).json({ error: 'User ID and Post ID are required' });
  }

  try {
    const success = await postRepository.deletePost(userId, postId);

    if (!success) {
      return res.status(404).json({ error: 'Post not found or user not authorized' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error in deletePost:', error);
    res.status(500).json({ error: 'Error deleting post' });
  }
};

const rePost = async (req, res) => {
  const { userId } = req.body;
  const { postId } = req.params;

  if (!userId || !postId) {
    return res.status(400).json({ error: 'User ID and Post ID are required' });
  }

  try {
    const retweetId = await postRepository.rePost(userId, postId);

    if (!retweetId) {
      return res.status(500).json({ error: 'Failed to create retweet' });
    }

    res.json({ message: 'Retweet added successfully', retweetId });
  } catch (error) {
    console.error('Error in rePost:', error);
    res.status(500).json({ error: 'Error retweeting post' });
  }
};

const commentPost = async (req, res) => {
  const { userId, content } = req.body;
  const { postId } = req.params;

  if (!userId || !content || !postId) {
    return res.status(400).json({ error: 'User ID, content, and Post ID are required' });
  }

  try {
    const commentId = await postRepository.commentPost(userId, postId, content);

    if (!commentId) {
      return res.status(500).json({ error: 'Failed to add comment' });
    }

    res.json({ message: 'Comment added successfully', commentId });
  } catch (error) {
    console.error('Error in commentPost:', error);
    res.status(500).json({ error: 'Error adding comment' });
  }
};

const getComments = async (req, res) => {
  const { postId } = req.params;

  if (!postId) {
    return res.status(400).json({ error: 'Post ID is required' });
  }

  try {
    const comments = await postRepository.getComments(postId);

    res.json({ comments });
  } catch (error) {
    console.error('Error in getComments:', error);
    res.status(500).json({ error: 'Error retrieving comments' });
  }
};

const getPostById = async (req, res) => {
  const userId = req.user ? req.user.id : null;
  const { postId } = req.params;

  if (!postId) {
    return res.status(400).json({ error: 'Post ID is required' });
  }

  try {
    const post = await postRepository.getPostById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (userId) {
      const hasLiked = await likeRepository.hasUserLikedPost(userId, postId);
      post.hasLiked = hasLiked;
    }

    res.json({ post });
  } catch (error) {
    console.error('Error in getPostById:', error);
    res.status(500).json({ error: 'Error retrieving post' });
  }
};


const getUserPosts = async (req, res) => {
  const { username } = req.params;
  let { page, limit } = req.query;

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 20;
  const offset = (page - 1) * limit;

  try {
    // Obter o ID do usuário a partir do username
    const [user] = await userRepository.getUserByUsername(username);
    console.log('[postController.js] - user', user)

    if (!user) {
      return res.status(404).json({ error: 'User not found >.<' });
    }

    const posts = await postRepository.getUserPosts(user.id, offset, limit);

    res.json({ posts });
  } catch (error) {
    console.error('Error in getUserPosts:', error);
    res.status(500).json({ error: 'Error retrieving user posts' });
  }
};

module.exports = {
  addPost,
  deletePost,
  rePost,
  commentPost,
  getComments,
  getPostById,
  getUserPosts,
};


// const RepositoryFactory = require('./repositoryFactory');
// const postRepository = RepositoryFactory.getPostRepository();

// const addPost = async (req, res) => {
//   const { userId, content } = req.body;

//   if (!userId || !content) {
//     return res.status(400).json({ error: 'User ID and content are required' });
//   }

//   try {
//     const postId = await postRepository.addPost(userId, content);
    
//     if (!postId) {
//       return res.status(500).json({ error: 'Failed to retrieve the post ID' });
//     }

//     res.json({ message: 'Post added successfully', postId });
//   } catch (error) {
//     console.error('Error in addPost:', error);
//     res.status(500).json({ error: 'Error adding post' });
//   }
// };

// const getAllPosts = async (req, res) => {
//   try {
//     const [posts, info] = await postRepository.getAllPosts();
//     res.json(posts);
//   } catch (error) {
//     console.error('Error in getAllPosts:', error);
//     res.status(500).json({ error: 'Error fetching posts' });
//   } 
// };

// const getPostById = async (req, res) => {
//   const { postId } = req.params;

//   try {
//     const post = await postRepository.getPostById(parseInt(postId, 10));
//     if (!post) {
//       return res.status(404).json({ error: 'Post not found' });
//     }
//     res.json(post);
//   } catch (error) {
//     console.error('Error in getPostById:', error);
//     res.status(500).json({ error: 'Error fetching post' });
//   }
// };

// const deletePost = async (req, res) => {
//   const { postId } = req.params;

//   try {
//     const result = await postRepository.deletePost(parseInt(postId, 10));
//     if (result === 0) {
//       return res.status(404).json({ error: 'Post not found' });
//     }
//     res.json({ message: 'Post deleted successfully' });
//   } catch (error) {
//     console.error('Error in deletePost:', error);
//     res.status(500).json({ error: 'Error deleting post' });
//   }
// };

// module.exports = { addPost, getAllPosts, getPostById, deletePost };
