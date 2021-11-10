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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
