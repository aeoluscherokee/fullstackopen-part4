const mongoose = require('mongoose');
const supertest = require('supertest');
const Blog = require('../models/blog');
const testData = require('./testData');

const app = require('../app');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject1 = new Blog(testData.initialBlogs[0]);
  await blogObject1.save();
  let blogObject2 = new Blog(testData.initialBlogs[1]);
  await blogObject2.save();
  let blogObject3 = new Blog(testData.initialBlogs[2]);
  await blogObject3.save();
  let blogObject4 = new Blog(testData.initialBlogs[3]);
  await blogObject4.save();
  let blogObject5 = new Blog(testData.initialBlogs[4]);
  await blogObject5.save();
  let blogObject6 = new Blog(testData.initialBlogs[5]);
  await blogObject6.save();
});

describe('blogs GET method', () => {
  test('return the correct amount of blog posts in the JSON format', async () => {
    const response = await api.get('/api/blogs');
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveLength(testData.initialBlogs.length);
  });
  test('return id property as unique identifier', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body.map((res) => res.id)).toBeDefined();
  });
});

describe('blogs POST method', () => {
  test('return code 201 and check if amount of blogs are updated', async () => {
    const response = await api.post('/api/blogs').send(testData.newBlog);
    expect(response.statusCode).toBe(201);
    const updatedBlogs = await api.get('/api/blogs');
    expect(updatedBlogs.body).toHaveLength(testData.initialBlogs.length + 1);
    expect(updatedBlogs.body[6]).toEqual(response.body);
  });
  test('return default value of likes is 0', async () => {
    const response = await api
      .post('/api/blogs')
      .send(testData.newBlogWithoutLikes);
    expect(response.statusCode).toBe(201);
    const updatedBlogs = await api.get('/api/blogs');
    expect(updatedBlogs.body[6]).toEqual(response.body);
    expect(updatedBlogs.body[6].likes).toEqual(0);
  });
  test('return code 400 when title and url are missing', async () => {
    const response = await api
      .post('/api/blogs')
      .send(testData.newBlogWithoutUrl);
    expect(response.statusCode).toBe(400);
    const response2 = await api
      .post('/api/blogs')
      .send(testData.newBlogWithoutTitle);
    expect(response2.statusCode).toBe(400);
    const response3 = await api
      .post('/api/blogs')
      .send(testData.newBlogwithoutBoth);
    expect(response3.statusCode).toBe(400);
  });
});

describe('blogs DELETE method', () => {
  test('return code 204 when delete successfully', async () => {
    const response = await api.delete('/api/blogs/5a422bc61b54a676234d17fc');
    expect(response.statusCode).toBe(204);
  });
  test('return code 404 when delete object is not existed', async () => {
    const response = await api.delete('/api/blogs/5a422bc61b54a676234d5555');
    expect(response.statusCode).toBe(404);
  });
  test('return error when catch error', async () => {
    const response = await api.delete('/api/blogs/5a422bc61b54a676234d555');
    expect(response.body.error).toBeDefined();
  });
});

describe('blogs PUT method', () => {
  test('return code 200 when update likes successfully', async () => {
    const response = await api
      .put('/api/blogs/likes/5a422bc61b54a676234d17fc')
      .send(testData.updateLikes);

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
