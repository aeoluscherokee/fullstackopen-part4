const testRouter = require('express').Router();
const helper = require('../tests/test_helper');

testRouter.post('/reset', async (request, response) => {
  try {
    await helper.createInitialUsers();
    await helper.createInitialBlogs();
    response.status(201).json({ message: 'success' });
  } catch (error) {
    response.send(error);
  }
});

module.exports = testRouter;
