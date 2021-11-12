const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');

const app = require('../app');

const api = supertest(app);

beforeAll(async () => {
  await helper.createInitialUsers();
  await helper.createInitialBlogs();
});

describe('blogs GET method', () => {
  test('return the correct amount of blog posts in the JSON format', async () => {
    const response = await api.get('/api/blogs');
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveLength(helper.initialBlogs.length);
    expect(response.body).toEqual(helper.populatedBlogs);
  });
  test('return id property as unique identifier', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body.map((res) => res.id)).toBeDefined();
  });
});

describe('blogs POST method', () => {
  test('return code 201 and check if amount of blogs are updated', async () => {
    const userAuth = await api.post('/api/users/login').send({
      username: helper.initialUsers[0].username,
      password: helper.initialUsers[0].password,
    });
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${userAuth.body.token}`)
      .send(helper.newBlog);
    expect(response.statusCode).toBe(201);
    const updatedBlogs = await api.get('/api/blogs');
    expect(updatedBlogs.body).toHaveLength(helper.initialBlogs.length + 1);
    expect(response.body).toBeDefined();
  });

  test('return code 401 if no authorization token', async () => {
    const response = await api.post('/api/blogs').send(helper.newBlog);
    expect(response.statusCode).toBe(401);
    const updatedBlogs = await api.get('/api/blogs');
    expect(updatedBlogs.body).toHaveLength(helper.initialBlogs.length + 1);
    expect(response.body).toBeDefined();
  });
  test('return code 401 if invalid authorization token', async () => {
    const response = await api
      .post('/api/blogs')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFlb2x1c2NoZXJva2VlIiwiaWQiOiI2MThkMjNkN2Y2ZDhiMjZkM2UyYzkzY2UiLCJpYXQiOjE2MzY2ODk4ODd9.m9Ecngt1yRvFHfCsXC7zPmxPjBnlcr-Dbr0-psXHUFw'
      )
      .send(helper.newBlog);
    expect(response.statusCode).toBe(401);
    const updatedBlogs = await api.get('/api/blogs');
    expect(updatedBlogs.body).toHaveLength(helper.initialBlogs.length + 1);
    expect(response.body).toBeDefined();
  });
  test('return default value of likes is 0', async () => {
    const userAuth = await api.post('/api/users/login').send({
      username: helper.initialUsers[1].username,
      password: helper.initialUsers[1].password,
    });
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${userAuth.body.token}`)
      .send(helper.newBlogWithoutLikes);
    expect(response.statusCode).toBe(201);
    const updatedBlogs = await api.get('/api/blogs');
    expect(updatedBlogs.body[7].likes).toEqual(0);
  });
  test('return code 400 when title and url are missing', async () => {
    const userAuth = await api.post('/api/users/login').send({
      username: helper.initialUsers[1].username,
      password: helper.initialUsers[1].password,
    });
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${userAuth.body.token}`)
      .send(helper.newBlogWithoutUrl);
    expect(response.statusCode).toBe(400);
    const response2 = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${userAuth.body.token}`)
      .send(helper.newBlogWithoutTitle);
    expect(response2.statusCode).toBe(400);
    const response3 = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${userAuth.body.token}`)
      .send(helper.newBlogwithoutBoth);
    expect(response3.statusCode).toBe(400);
  });
});

describe('blogs DELETE method', () => {
  test('return code 204 when delete successfully', async () => {
    const userAuth = await api.post('/api/users/login').send({
      username: helper.initialUsers[0].username,
      password: helper.initialUsers[0].password,
    });
    const response = await api
      .delete('/api/blogs/5a422bc61b54a676234d17fc')
      .set('Authorization', `Bearer ${userAuth.body.token}`);
    expect(response.statusCode).toBe(204);
  });
  test('return code 404 when delete object is not existed', async () => {
    const userAuth = await api.post('/api/users/login').send({
      username: helper.initialUsers[0].username,
      password: helper.initialUsers[0].password,
    });
    const response = await api
      .delete('/api/blogs/5a422bc61b54a676234d5555')
      .set('Authorization', `Bearer ${userAuth.body.token}`);
    expect(response.statusCode).toBe(404);
  });
  test('return code 403 when username is not creator', async () => {
    const userAuth = await api.post('/api/users/login').send({
      username: helper.initialUsers[1].username,
      password: helper.initialUsers[1].password,
    });
    const response = await api
      .delete('/api/blogs/5a422b891b54a676234d17fa')
      .set('Authorization', `Bearer ${userAuth.body.token}`);
    expect(response.statusCode).toBe(403);
  });
  test('return error when malformatted id', async () => {
    const response = await api.delete('/api/blogs/5a422bc61b54a676234d555');
    expect(response.body.error).toBeDefined();
  });
});

describe('blogs PUT method', () => {
  test('return code 200 when update likes successfully', async () => {
    const response = await api
      .put('/api/blogs/likes/5a422ba71b54a676234d17fb')
      .send(helper.updateLikes);
    expect(response.statusCode).toBe(200);
    expect(response.body.likes).toBe(3);
  });
  test('return code 404 when update likes object is not existed', async () => {
    const response = await api.put('/api/blogs/likes/5a422bc61b54a676234d5555');
    expect(response.statusCode).toBe(404);
  });
  test('return error when catch error', async () => {
    const response = await api.put('/api/blogs/likes/5a422bc61b54a676234d555');
    expect(response.body.error).toBeDefined();
  });
});

afterAll(() => {
  mongoose.connection.close();
});
