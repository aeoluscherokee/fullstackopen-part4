const mongoose = require('mongoose');
const supertest = require('supertest');
const Blog = require('../models/blog');

const app = require('../app');

const api = supertest(app);

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
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

afterAll(() => {
  mongoose.connection.close();
});
