const dummy = (blogs) => {
  if (blogs.length >= 0) {
    return 1;
  }
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  } else if (blogs.length === 1) {
    return blogs[0].likes;
  } else if (blogs.length >= 1) {
    const sum = blogs.reduce(
      (prevLikes, currentValue) => prevLikes + currentValue.likes,
      0
    );
    return sum;
  }
};

const favoriteBlog = (blogs) => {
  const sortedList = blogs.sort((a, b) => b.likes - a.likes);
  const favorite = {
    title: sortedList[0].title,
    author: sortedList[0].author,
    likes: sortedList[0].likes,
  };
  return favorite;
};

const mostBlog = (blogs) => {
  const counter = new Array();
  blogs.forEach((blog) => {
    const isExist = counter.some(({ author }) => author === blog.author);
    if (isExist) {
      counter.map((el) => {
        if (el.author === blog.author) {
          el.blogs++;
        } else return;
      });
    } else {
      counter.push({ author: blog.author, blogs: 1 });
    }
  });
  const sortedCounter = counter.sort((a, b) => b.blogs - a.blogs);
  const mostCounter = sortedCounter[0];
  console.log(mostCounter);
  return mostCounter;
};

const mostLikes = (blogs) => {
  const counter = new Array();
  blogs.forEach((blog) => {
    const isExist = counter.some(({ author }) => author === blog.author);
    if (isExist) {
      counter.map((el) => {
        if (el.author === blog.author) {
          el.likes = el.likes + blog.likes;
        } else return;
      });
    } else {
      counter.push({ author: blog.author, likes: blog.likes });
    }
  });
  const sortedCounter = counter.sort((a, b) => b.likes - a.likes);
  const mostCounter = sortedCounter[0];
  console.log(mostCounter);
  return mostCounter;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlog,
  mostLikes,
};
