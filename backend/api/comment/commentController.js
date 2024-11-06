const RepositoryFactory = require('./repositoryFactory');
const commentRepository = RepositoryFactory.getCommentRepository();

const addComment = async (req, res) => {
  const { postId, userId, content } = req.body;

  if (!postId || !userId || !content) {
    return res.status(400).json({ error: 'Post ID, User ID, and content are required' });
  }

  try {
    const commentId = await commentRepository.addComment(postId, userId, content);
    res.json({ message: 'Comment added successfully', commentId });
  } catch (error) {
    res.status(500).json({ error: 'Error adding comment' });
  }
};

const getAllCommentsByPostId = async (req, res) => {
  try {
    const comments = await commentRepository.getCommentsByPostId(req.params.postId);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching comments' });
  }
};

const getCommentById = async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await commentRepository.getCommentById(parseInt(commentId, 10));
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching comment' });
  }
};

const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const result = await commentRepository.deleteComment(parseInt(commentId, 10));
    if (result === 0) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting comment' });
  }
};

module.exports = { addComment, getAllComments: getAllCommentsByPostId, getCommentById, deleteComment };
