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
      return comment.id;
    }
  
    async getCommentById(commentId) {
      return this.comments.find(comment => comment.id === commentId) || null;
    }
  
    async getCommentsByPostId(postId) {
      return this.comments.filter(comment => comment.post_id === postId);
    }
  
    async deleteComment(commentId) {
      const index = this.comments.findIndex(comment => comment.id === commentId);
      if (index !== -1) {
        this.comments.splice(index, 1);
        return 1;
      }
      return 0;
    }
  }
  
  module.exports = new CommentInMemoryRepository();
  