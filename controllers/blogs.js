const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const { userExtractor } = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user');
  response.json(blogs);
});

blogsRouter.post('/', userExtractor, async (request, response, next) => {
  const body = request.body;

  try {
    if (!request.token || !request.userId) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }
    const user = await User.findById(request.userId);
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    });
    const newBlog = await blog.save();
    user.blogs = user.blogs.concat(newBlog._id);
    await user.save({ validateModifiedOnly: true });
    response.status(201).json(newBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const id = request.params.id;
  try {
    if (!request.token || !request.userId) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }
    const blog = await Blog.findById(id);
    if (request.userId !== blog.user.toString()) {
      return response
        .status(403)
        .json({ error: 'only creator is allowed to delete a blog' });
    }
    const deletedBlog = await Blog.findByIdAndRemove(id);
    if (deletedBlog) {
      response.status(204).end();
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

blogsRouter.put('/likes/:id', async (request, response, next) => {
  const body = request.body;
  const id = request.params.id;
  const updateBlog = {
    ...body,
  };
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, updateBlog, {
      runValidators: true,
    });
    if (updatedBlog) {
      response.status(200).json(updateBlog);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
