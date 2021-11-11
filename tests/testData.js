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
  title: 'Type wars',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  likes: 3,
};

const initialUsers = [
  {
    _id: '618d36aae77920fef23dfa41',
    username: 'abswan',
    name: 'Alan Blackswan',
    passwordHash:
      '$2b$10$LQKlMsNhV2GC6j7TuKyJnO46Guh90LIKPr6C/S8rWUQPRrY.B8Pba',
  },
  {
    _id: '618d36aae77920fef23dfa45',
    username: 'cirrues',
    name: 'Kenedy Suspero',
    passwordHash:
      '$2b$10$le1FQwJJLTOZUTUJDg4/x.WVk3A9A3dPhO9OO.5aT0f2JgxFDfdSy',
  },
  {
    _id: '618d36abe77920fef23dfa49',
    username: 'leeoencardia',
    name: 'Cardine Anthony',
    passwordHash:
      '$2b$10$/3DC.RFfJu3VQVLI4O06lOEZC1vD9eFpWdHnGTTt.t17rj7/6olYS',
  },
];

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
  newBlog,
  newBlogWithoutLikes,
  newBlogWithoutTitle,
  newBlogWithoutUrl,
  newBlogWithoutBoth,
  updateLikes,
  initialUsers,
  newUser,
  newUserWithoutUsername,
  newUserWithoutPassword,
  newUserWithShortUsername,
  newUserWithShortPassword,
  newUserWithExistingUsername,
};
