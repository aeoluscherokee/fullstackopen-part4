const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');

const app = require('../app');

const api = supertest(app);

beforeAll(async () => {
  await helper.createInitialUsers();
});

describe('blogs GET method', () => {
  test('return the correct amount of users in the JSON format', async () => {
    const response = await api.get('/api/users').send(helper.newUser);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveLength(helper.initialUsers.length);
  });
  test('return the users with populated blogs', async () => {
    const userAuth = await api.post('/api/users/login').send({
      username: helper.initialUsers[0].username,
      password: helper.initialUsers[0].password,
    });
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${userAuth.body.token}`)
      .send(helper.newBlog);
    const response = await api.get('/api/users').send(helper.newUser);
    expect(response.body[0].blogs.length).toBe(1);
    expect(response.body[0].blogs[0].user).toBe('618d36aae77920fef23dfa41');
  });
});

describe('blogs POST method', () => {
  test('return code 201 when new user succesfully created', async () => {
    const response = await api.post('/api/users').send(helper.newUser);
    expect(response.statusCode).toBe(201);
  });
  test('return code 400 when empty username', async () => {
    const response = await api
      .post('/api/users')
      .send(helper.newUserWithoutUsername);
    expect(response.statusCode).toBe(400);
  });
  test('return code 400 when empty password', async () => {
    const response = await api
      .post('/api/users')
      .send(helper.newUserWithoutPassword);
    expect(response.statusCode).toBe(400);
  });
  test('return code 400 when username is less than 3', async () => {
    const response = await api
      .post('/api/users')
      .send(helper.newUserWithShortUsername);
    expect(response.statusCode).toBe(400);
  });
  test('return code 400 when password is less than 3', async () => {
    const response = await api
      .post('/api/users')
      .send(helper.newUserWithShortPassword);
    expect(response.statusCode).toBe(400);
  });
  test('return code 400 when username is existing', async () => {
    const response = await api
      .post('/api/users')
      .send(helper.newUserWithShortPassword);
    expect(response.statusCode).toBe(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
