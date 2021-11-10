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

module.exports = {
  dummy,
  totalLikes,
};
