const RepositoryFactory = require('./repositoryFactory');
const commentRepository = RepositoryFactory.getCommentRepository();

const addComment = async (req, res) => {
  const { postId, userId, content } = req.body;

  if (!postId || !userId || !content) {
    console.warn('Request missing required fields:', { postId, userId, content });
    return res.status(400).json({ error: 'Post ID, User ID, and content are required' });
  }

  try {
    console.log('Attempting to add comment:', { postId, userId, content });
    const commentId = await commentRepository.addComment(postId, userId, content);
    console.log('Comment added successfully with ID:', commentId);
    res.json({ message: 'Comment added successfully', commentId });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Error adding comment' });
  }
};

const getAllCommentsByPostId = async (req, res) => {
  try {
    console.log('Fetching all comments for post ID:', req.params.postId);
    const comments = await commentRepository.getAllCommentsByPostId(req.params.postId);
    console.log(`Retrieved ${comments.length} comments for post ID ${req.params.postId}`);
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Error fetching comments' });
  }
};

const getCommentById = async (req, res) => {
  const { commentId } = req.params;

  try {
    console.log('Fetching comment by ID:', commentId);
    const comment = await commentRepository.getCommentById(parseInt(commentId, 10));
    if (!comment) {
      console.warn('Comment not found with ID:', commentId);
      return res.status(404).json({ error: 'Comment not found' });
    }
    console.log('Comment retrieved:', comment);
    res.json(comment);
  } catch (error) {
    console.log('comment:', commentId);
    console.error('Error fetching comment:', error);
    res.status(500).json({ error: 'Error fetching comment' });
  }
};

const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    console.log('Attempting to delete comment by ID:', commentId);
    const result = await commentRepository.deleteComment(parseInt(commentId, 10));
    if (result === 0) {
      console.warn('Comment not found for deletion with ID:', commentId);
      return res.status(404).json({ error: 'Comment not found' });
    }
    console.log('Comment deleted successfully with ID:', commentId);
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Error deleting comment' });
  }
};

module.exports = { addComment, getAllCommentsByPostId, getCommentById, deleteComment };
