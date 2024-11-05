class PostInMemoryRepository {
  constructor() {
    this.posts = [];
    this.currentId = 1;
  }

  async addPost(userId, content) {
    const post = {
      id: this.currentId++,
      user_id: userId,
      content,
      created_at: new Date().toISOString()
    };
    this.posts.push(post);
    return post.id;
  }

  async getPostById(postId) {
    return this.posts.find(post => post.id === postId) || null;
  }

  async getAllPosts() {
    return this.posts;
  }

  async deletePost(postId) {
    const index = this.posts.findIndex(post => post.id === postId);
    if (index !== -1) {
      this.posts.splice(index, 1);
      return 1;
    }
    return 0;
  }
}

module.exports = new PostInMemoryRepository();
