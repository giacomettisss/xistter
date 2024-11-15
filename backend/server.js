const express = require('express');
const dotenv = require('dotenv');
const PostRepositoryFactory = require('./api/post/repositoryFactory');
const UserRepositoryFactory = require('./api/user/repositoryFactory');
const CommentRepositoryFactory = require('./api/comment/repositoryFactory');
const followerRepositoryFactory = require('./api/follower/repositoryFactory');
const likeRepositoryFactory = require('./api/like/repositoryFactory');
const feedRepositoryFactory = require('./api/feed/repositoryFactory');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const postRepository = PostRepositoryFactory.getPostRepository();
console.log(`Using ${process.env.REPO_TYPE || 'memory'} post repository for posts`);

const userRepository = UserRepositoryFactory.getUserRepository();
console.log(`Using ${process.env.REPO_TYPE || 'memory'} user repository for users`);

const commentRepository = CommentRepositoryFactory.getCommentRepository();
console.log(`Using ${process.env.REPO_TYPE || 'memory'} comment repository for comments`);

const followerRepository = followerRepositoryFactory.getFollowerRepository();
console.log(`Using ${process.env.REPO_TYPE || 'memory'} comment repository for comments`);

const likeRepository = likeRepositoryFactory.getLikeRepository();
console.log(`Using ${process.env.REPO_TYPE || 'memory'} comment repository for comments`);

const feedRepository = feedRepositoryFactory.getFeedRepository();
console.log(`Using ${process.env.REPO_TYPE || 'memory'} comment repository for comments`);

const authRoutes = require('./api/auth/authRoutes');
app.use('/auth', authRoutes);

const postRoutes = require('./api/post/postRoutes');
app.use('/post', postRoutes);

const userRoutes = require('./api/user/userRoutes');
app.use('/user', userRoutes);

const commentRoutes = require('./api/comment/commentRoutes');
app.use('/comment', commentRoutes);

const followerRoutes = require('./api/follower/followerRoutes');
app.use('/follower', followerRoutes);

const likeRoutes = require('./api/like/likeRoutes');
app.use('/like', likeRoutes);

const feedRoutes = require('./api/feed/feedRoutes');
app.use('/feed', feedRoutes);

app.get('/', (req, res) => res.send('Xistter API is running'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
