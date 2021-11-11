const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);

  try {
    const newBlog = await blog.save();
    response.status(201).json(newBlog);
  } catch (error) {
    response.status(400).json(error);
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;
  try {
    const deletedBlog = await Blog.findByIdAndRemove(id);
    if (deletedBlog) {
      response.status(204).end();
    } else {
      response.status(404).end();
    }
  } catch (error) {
    response.json({ error: error });
  }
});

module.exports = blogsRouter;
