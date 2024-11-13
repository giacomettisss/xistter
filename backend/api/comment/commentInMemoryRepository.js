class CommentInMemoryRepository {
  constructor() {
    this.comments = [];
    this.currentId = 1;
  }

  async addComment(postId, userId, content) {
    const comment = {
      id: this.currentId++,
      post_id: postId,
      user_id: userId,
      content,
      created_at: new Date().toISOString()
    };
    this.comments.push(comment);
    console.log(`[CommentInMemoryRepository] Added comment with ID ${comment.id} for post ID ${postId} by user ID ${userId}`);
    return comment.id;
  }

  async getCommentById(commentId) {
    console.log(`[CommentInMemoryRepository] Fetching comment with ID ${commentId}`);
    const comment = this.comments.find(comment => comment.id === commentId) || null;
    if (comment) {
      console.log(`[CommentInMemoryRepository] Found comment: `, comment);
    } else {
      console.log(`[CommentInMemoryRepository] Comment with ID ${commentId} not found`);
    }
    return comment;
  }

  async getAllCommentsByPostId(postId) {
    console.log(`[CommentInMemoryRepository] Fetching all comments for post ID ${postId}`);
    const filtered_comments = this.comments.filter(comment => comment.post_id == postId);
    console.log(`[CommentInMemoryRepository] Found ${filtered_comments.length} comments for post ID ${postId}`);
    return filtered_comments;
  }

  async deleteComment(commentId) {
    console.log(`[CommentInMemoryRepository] Deleting comment with ID ${commentId}`);
    const index = this.comments.findIndex(comment => comment.id === commentId);
    if (index !== -1) {
      this.comments.splice(index, 1);
      console.log(`[CommentInMemoryRepository] Deleted comment with ID ${commentId}`);
      return 1;
    }
    console.log(`[CommentInMemoryRepository] Comment with ID ${commentId} not found`);
    return 0;
  }
}

module.exports = new CommentInMemoryRepository();
