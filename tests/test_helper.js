const bcrypt = require('bcrypt');
const Blog = require('../models/blog');
const User = require('../models/user');
const mongoose = require('mongoose');

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

const populatedBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: {
      username: 'abswan',
      name: 'Alan Blackswan',
      id: '618d36aae77920fef23dfa41',
    },
    id: '5a422a851b54a676234d17f7',
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: {
      username: 'abswan',
      name: 'Alan Blackswan',
      id: '618d36aae77920fef23dfa41',
    },
    id: '5a422aa71b54a676234d17f8',
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: {
      username: 'abswan',
      name: 'Alan Blackswan',
      id: '618d36aae77920fef23dfa41',
    },
    id: '5a422b3a1b54a676234d17f9',
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    user: {
      username: 'abswan',
      name: 'Alan Blackswan',
      id: '618d36aae77920fef23dfa41',
    },
    id: '5a422b891b54a676234d17fa',
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    user: {
      username: 'abswan',
      name: 'Alan Blackswan',
      id: '618d36aae77920fef23dfa41',
    },
    id: '5a422ba71b54a676234d17fb',
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    user: {
      username: 'abswan',
      name: 'Alan Blackswan',
      id: '618d36aae77920fef23dfa41',
    },
    id: '5a422bc61b54a676234d17fc',
  },
];

const newBlog = {
  title: 'Test',
  author: 'Test',
  url: 'http://test.test.test/test/',
  likes: 2,
};

const newBlogWithoutLikes = {
  title: 'Test',
  author: 'Test',
  url: 'http://test.test.test/test/',
};

const newBlogWithoutTitle = {
  author: 'Test',
  url: 'http://test.test.test/test/',
};

const newBlogWithoutUrl = {
  title: 'Test',
  author: 'Test',
};

const newBlogWithoutBoth = {
  author: 'Test',
};

const updateLikes = {
  title: 'TDD harms architecture',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
  likes: 3,
};

const initialUsers = [
  {
    _id: '618d36aae77920fef23dfa41',
    username: 'abswan',
    name: 'Alan Blackswan',
    password: 'nawsba',
  },
  {
    _id: '618d36aae77920fef23dfa45',
    username: 'cirrues',
    name: 'Kenedy Suspero',
    password: 'seurric',
  },
];

const createInitialUsers = async () => {
  await User.deleteMany({});
  const newUser1 = new User({
    _id: initialUsers[0]._id,
    username: initialUsers[0].username,
    name: initialUsers[0].name,
    passwordHash: await bcrypt.hash(initialUsers[0].password, 10),
  });
  await newUser1.save();
  const newUser2 = new User({
    _id: initialUsers[1]._id,
    username: initialUsers[1].username,
    name: initialUsers[1].name,
    passwordHash: await bcrypt.hash(initialUsers[1].password, 10),
  });
  await newUser2.save();
};
mongoose.Types.ObjectId;
const createInitialBlogs = async () => {
  await Blog.deleteMany({});
  let blogObject1 = new Blog({
    ...initialBlogs[0],
    user: mongoose.Types.ObjectId('618d36aae77920fef23dfa41'),
  });
  await blogObject1.save();
  let blogObject2 = new Blog({
    ...initialBlogs[1],
    user: mongoose.Types.ObjectId('618d36aae77920fef23dfa41'),
  });
  await blogObject2.save();
  let blogObject3 = new Blog({
    ...initialBlogs[2],
    user: mongoose.Types.ObjectId('618d36aae77920fef23dfa41'),
  });
  await blogObject3.save();
  let blogObject4 = new Blog({
    ...initialBlogs[3],
    user: mongoose.Types.ObjectId('618d36aae77920fef23dfa41'),
  });
  await blogObject4.save();
  let blogObject5 = new Blog({
    ...initialBlogs[4],
    user: mongoose.Types.ObjectId('618d36aae77920fef23dfa41'),
  });
  await blogObject5.save();
  let blogObject6 = new Blog({
    ...initialBlogs[5],
    user: mongoose.Types.ObjectId('618d36aae77920fef23dfa41'),
  });
  await blogObject6.save();
};

const newUser = {
  username: 'leonacary',
  name: 'Leon Ronaldes',
  password: 'belikewhatyouareat20',
};

const newUserWithoutUsername = {
  name: 'Richards',
  password: 'iamolderthanyoumate',
};

const newUserWithoutPassword = {
  username: 'richardiscoming',
  name: 'Richards',
};

const newUserWithShortUsername = {
  username: 'le',
  name: 'Leon Ronaldes',
  password: 'belikewhatyouareat20',
};

const newUserWithShortPassword = {
  username: 'leonacary',
  name: 'Leon Ronaldes',
  password: 'be',
};

const newUserWithExistingUsername = {
  username: 'leeoencardia',
  name: 'Leon Ronaldes',
  password: 'belikewhatyouareat20',
};

module.exports = {
  initialBlogs,
  populatedBlogs,
  newBlog,
  newBlogWithoutLikes,
  newBlogWithoutTitle,
  newBlogWithoutUrl,
  newBlogWithoutBoth,
  updateLikes,
  initialUsers,
  createInitialUsers,
  createInitialBlogs,
  newUser,
  newUserWithoutUsername,
  newUserWithoutPassword,
  newUserWithShortUsername,
  newUserWithShortPassword,
  newUserWithExistingUsername,
};
