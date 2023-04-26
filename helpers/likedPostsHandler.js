export const likedPostsHandler = (initPostsArray, userId) => {
  const newPostsArray = initPostsArray?.map((post) => {
    if (post.likes.includes(userId)) {
      return { ...post, isLiked: true };
    } else return post;
  });

  return newPostsArray;
};
