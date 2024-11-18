const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const PostRepositoryFactory = require('./api/post/repositoryFactory');
const UserRepositoryFactory = require('./api/user/repositoryFactory');
const followerRepositoryFactory = require('./api/follower/repositoryFactory');
const likeRepositoryFactory = require('./api/like/repositoryFactory');
const feedRepositoryFactory = require('./api/feed/repositoryFactory');
const authMiddleware = require('./api/auth/authMiddleware'); 
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cookieParser());

app.use(express.static(path.join(__dirname, '..', 'frontend')));

const postRepository = PostRepositoryFactory.getPostRepository();
console.log(`Using ${process.env.REPO_TYPE || 'memory'} post repository for posts`);

const userRepository = UserRepositoryFactory.getUserRepository();
console.log(`Using ${process.env.REPO_TYPE || 'memory'} user repository for users`);

const followerRepository = followerRepositoryFactory.getFollowerRepository();
console.log(`Using ${process.env.REPO_TYPE || 'memory'} follower repository for follower`);

const likeRepository = likeRepositoryFactory.getLikeRepository();
console.log(`Using ${process.env.REPO_TYPE || 'memory'} likes repository for likes`);

const feedRepository = feedRepositoryFactory.getFeedRepository();
console.log(`Using ${process.env.REPO_TYPE || 'memory'} feed repository for feed`);

/* API Routes */

const authRoutes = require('./api/auth/authRoutes');
app.use('/api/auth', authRoutes);

const postRoutes = require('./api/post/postRoutes');
// app.use('/api/post', authMiddleware, postRoutes);
app.use('/api/post', postRoutes);

const userRoutes = require('./api/user/userRoutes');
app.use('/api/user', userRoutes);

const followerRoutes = require('./api/follower/followerRoutes');
app.use('/api/follower', followerRoutes);

const likeRoutes = require('./api/like/likeRoutes');
app.use('/api/like', likeRoutes);

const feedRoutes = require('./api/feed/feedRoutes');
app.use('/api/feed', authMiddleware, feedRoutes);

app.get('/api/running', (req, res) => res.send('Xistter API is running'));

/* Frontend Routes */

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'login', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'register', 'register.html'));
});

app.get('/feed', authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'feed', 'feed.html'));
});

app.get('/profile/:username', authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'profile', 'profile.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});