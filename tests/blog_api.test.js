const mongoose = require('mongoose');
const supertest = require('supertest');
const Blog = require('../models/blog');

const app = require('../app');

const api = supertest(app);

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject1 = new Blog(initialBlogs[0]);
  await blogObject1.save();
  let blogObject2 = new Blog(initialBlogs[1]);
  await blogObject2.save();
  let blogObject3 = new Blog(initialBlogs[2]);
  await blogObject3.save();
  let blogObject4 = new Blog(initialBlogs[3]);
  await blogObject4.save();
  let blogObject5 = new Blog(initialBlogs[4]);
  await blogObject5.save();
  let blogObject6 = new Blog(initialBlogs[5]);
  await blogObject6.save();
});

test('blogs are returned the correct amount of blog posts in the JSON format', async () => {
  const response = await api.get('/api/blogs');
  expect(response.type).toBe('application/json');
  expect(response.body.length).toEqual(initialBlogs.length);
});
test('blogs have id property', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body.map((res) => res._id)).toBeDefined();
});
test('create new blog successfully', async () => {
  const newBlog = {
    title: 'Test',
    author: 'Test',
    url: 'Test',
    likes: 2,
  };
  const response = await api.post('/api/blogs').send(newBlog);
  expect(response.statusCode).toBe(201);
  const updatedBlogs = await api.get('/api/blogs');
  expect(updatedBlogs.body.length).toBe(initialBlogs.length + 1);
  expect(updatedBlogs.body[6]).toEqual(response.body);
});
test('default value of likes is 0', async () => {
  const newBlog = {
    title: 'Test2',
    author: 'Test2',
    url: 'Test2',
  };
  const response = await api.post('/api/blogs').send(newBlog);
  expect(response.statusCode).toBe(201);
  const updatedBlogs = await api.get('/api/blogs');
  expect(updatedBlogs.body[6]).toEqual(response.body);
  expect(updatedBlogs.body[6].likes).toEqual(0);
});
test('return code 400 when title and url are missing', async () => {
  const noUrl = {
    title: 'Test3',
    author: 'Test3',
  };
  const response = await api.post('/api/blogs').send(noUrl);
  expect(response.statusCode).toBe(400);
  const noTitle = {
    url: 'Test3',
    author: 'Test3',
  };
  const response2 = await api.post('/api/blogs').send(noTitle);
  expect(response2.statusCode).toBe(400);
  const noBoth = {
    url: 'Test3',
    author: 'Test3',
  };
  const response3 = await api.post('/api/blogs').send(noBoth);
  expect(response3.statusCode).toBe(400);
});
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

afterAll(() => {
  mongoose.connection.close();
});
