const express = require("express");
const {
  createPost,
  getPosts,
  updatePosts,
  // likePosts,
  deletePosts,
  getAllPosts,
} = require("../controllers/posts");
const { verifyToken } = require("../middlewares/authMiddleware");
const { postIdParam } = require("../middlewares/postsMiddleware");
const router = express.Router();

router.param("postId", postIdParam);

router.post("/create", verifyToken, createPost);

router.get("/getposts", verifyToken, getPosts);

router.put("/update", verifyToken, updatePosts);

// router.get("/likeposts/:postId", verifyToken, likePosts);

router.delete("/delete", verifyToken, deletePosts);

router.get("/getallposts", getAllPosts);

<<<<<<< HEAD
=======
router.post("/likes", verifyToken, likesCount);
>>>>>>> 185334ad08ecaa0b2beefcfe0586dd44046fb149

module.exports = router;

//localhost:8000/posts/create
//localhost:8000/posts/uploadimage
//localhost:8000/posts/update/:postId
//localhost:8000/posts/likeposts/:postId
//localhost:8000/posts/likes
//localhost:8000/posts/getposts
//localhost:8000/posts/getallposts
