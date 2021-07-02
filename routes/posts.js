const express = require('express');
const { createPost } = require('../controllers/posts');
const {verifyToken} = require('../middlewares/authMiddleware');
const router = express.Router();


router.post('/create', verifyToken, createPost);
// router.delete('/delete/:postId', );
// router.put('/update/:postId', );
// router.get('/getuserposts', );
// router.get('/getallposts', );

module.exports = router;

// localhost:8000/posts/create
// localhost:8000/posts/update/:postId
// localhost:8000/posts/delete/:postId
// localhost:8000/posts/getuserposts
// localhost:8000/posts/getallposts