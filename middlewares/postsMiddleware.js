exports.postIdParam = (req, res, next, id) => {
  req.postId = id;
  next();
};
