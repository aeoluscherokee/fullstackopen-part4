const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersRouter = require('express').Router();
const User = require('../models/user');
const config = require('../utils/config');

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

usersRouter.post('/login', async (request, response) => {
  const body = request.body;
  const user = await User.findOne({ username: body.username });
  const isPasswordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);

  if (!(user && isPasswordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    });
  }
  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, config.TOKEN_SECRET);

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = usersRouter;
