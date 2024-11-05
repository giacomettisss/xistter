const express = require('express');
const dotenv = require('dotenv');
const RepositoryFactory = require('./api/post/repositoryFactory');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const postRepository = RepositoryFactory.getPostRepository();
console.log(`Using ${process.env.REPO_TYPE || 'memory'} repository for posts`);

const postRoutes = require('./api/post/postRoutes');
app.use('/post', postRoutes);

app.get('/', (req, res) => res.send('Xistter API is running'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
