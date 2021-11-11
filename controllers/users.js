const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs');

  response.json(users);
});

usersRouter.post('/', async (request, response, next) => {
  const body = request.body;

  if (!body.password || body.password.length < 3) {
    response.status(400).json({
      error: 'password must be atleast 3 characters long',
    });
  } else {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    });
    try {
      const newUser = await user.save();
      response.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
});

module.exports = usersRouter;
