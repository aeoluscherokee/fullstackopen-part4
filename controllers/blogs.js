const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const Comment = require('../models/comment');
const { userExtractor } = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  });
  response.json(blogs);
});

blogsRouter.get('/comments', async (request, response) => {
  const comments = await Comment.find({}).populate('blog');
  response.json(comments);
});

blogsRouter.post('/', userExtractor, async (request, response, next) => {
  const body = request.body;

  try {
    const user = await User.findById(request.userId);
    if (!request.token || !request.userId || !user) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }
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
    const resData = {
      id: newBlog.id,
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: newBlog.likes,
      user,
    };
    response.status(201).json(resData);
  } catch (error) {
    next(error);
  }
});

blogsRouter.post(
  '/:id/comments',
  userExtractor,
  async (request, response, next) => {
    const body = request.body;
    console.log(body);
    try {
      const user = await User.findById(request.userId);
      if (!request.token || !request.userId || !user) {
        return response.status(401).json({ error: 'token missing or invalid' });
      }
      const blog = await Blog.findById(request.params.id);
      const comment = new Comment({
        comment: body.comment,
        blog: blog._id,
        user: user._id,
      });
      const newComment = await comment.save();
      user.comments = user.comments.concat(newComment._id);
      blog.comments = blog.comments.concat(newComment._id);
      await user.save({ validateModifiedOnly: true });
      await blog.save({ validateModifiedOnly: true });
      const resData = {
        id: newComment.id,
        comment: newComment.comment,
        blog: { id: blog._id },
      };
      response.status(201).json(resData);
    } catch (error) {
      next(error);
    }
  }
);

blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const id = request.params.id;
  try {
    if (!request.token || !request.userId) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }
    const blog = await Blog.findById(id);

    if (blog) {
      if (request.userId === blog.user.toString()) {
        await Blog.findByIdAndRemove(id);
        response.status(204).end();
      } else {
        return response
          .status(403)
          .json({ error: 'only creator is allowed to delete a blog' });
      }
    } else {
      response.status(404).json({ error: 'this blog is not existed' });
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
