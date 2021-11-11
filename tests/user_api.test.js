const mongoose = require('mongoose');
const supertest = require('supertest');
const User = require('../models/user');
const testData = require('./testData');

const app = require('../app');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  let userObject1 = new User(testData.initialUsers[0]);
  await userObject1.save();
  let userObject2 = new User(testData.initialUsers[1]);
  await userObject2.save();
  let userObject3 = new User(testData.initialUsers[2]);
  await userObject3.save();
});

describe('blogs POST method', () => {
  test('return code 201 when new user succesfully created', async () => {
    const response = await api.post('/api/users').send(testData.newUser);
    expect(response.statusCode).toBe(201);
  });
  test('return code 400 when empty username', async () => {
    const response = await api
      .post('/api/users')
      .send(testData.newUserWithoutUsername);
    expect(response.statusCode).toBe(400);
  });
  test('return code 400 when empty password', async () => {
    const response = await api
      .post('/api/users')
      .send(testData.newUserWithoutPassword);
    expect(response.statusCode).toBe(400);
  });
  test('return code 400 when username is less than 3', async () => {
    const response = await api
      .post('/api/users')
      .send(testData.newUserWithShortUsername);
    expect(response.statusCode).toBe(400);
  });
  test('return code 400 when password is less than 3', async () => {
    const response = await api
      .post('/api/users')
      .send(testData.newUserWithShortPassword);
    expect(response.statusCode).toBe(400);
  });
  test('return code 400 when username is existing', async () => {
    const response = await api
      .post('/api/users')
      .send(testData.newUserWithShortPassword);
    expect(response.statusCode).toBe(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
