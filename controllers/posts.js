const client = require("../configs/db");
const formidable = require("formidable");
const cloudinary = require("../configs/cloudinary");

//create post route
exports.createPost = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (error, fields, file) => {
    if (error) {
      return res.status(400).json({
        error: "Error creating post",
      });
    } else if (!(Object.keys(file).length > 0)) {
      if (fields.caption.length === 0) {
        res.status(400).json({
          message: "Cannot create an empty post",
        });
      } else {
        client
          .query(
            `INSERT INTO posts (email,content,image) VALUES ('${req.email}','${fields.caption}');`
          )
          .then((data) => {
            res.status(200).json({
              message: "Post created successfully",
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              message: "Database error",
            });
          });
      }
    } else {
      console.log(fields, file);
      cloudinary.uploader.upload(file.image.path, (err, result) => {
        console.log(err, result);
        client
          .query(
            `INSERT INTO posts (email,content,image) VALUES ('${req.email}','${fields.caption}', '${result.secure_url}');`
          )
          .then((data) => {
            res.status(200).json({
              message: "Post created successfully",
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              message: "Database error",
            });
          });
      });
    }
  });
};

//get posts of a specific user route
exports.getPosts = (req, res) => {
  client
    .query(`SELECT * FROM posts WHERE email='${req.email}';`)
    .then((data) => {
      const postData = data.rows;
      const newdata = postData.map((post) => {
        return {
          postId: post.postid,
          content: post.content,
          image: post.image,
        };
      });
      console.log(newdata);
      res.status(200).json({
        message: "Data Displayed Successfully",
        data: newdata,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Database error",
      });
    });
};

//get all posts route
exports.getAllPosts = (req, res) => {
  client
    .query(`SELECT * FROM posts;`)
    .then((data) => {
      const postData = data.rows;
      const newdata = postData.map((post) => {
        return {
          postId: post.postid,
          content: post.content,
          image: post.image,
        };
      });
      console.log(newdata);
      res.status(200).json({
        message: "Data Displayed Successfully",
        data: newdata,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Database error",
      });
    });
};

//update route
exports.updatePosts = (req, res) => {
  const postId = req.postId;
  const { content } = req.body;
  client
    .query(`UPDATE posts set content = '${content}' WHERE id='${postId}';`)
    .then((data) => {
      if (!content) {
        res.status(400).json({
          message: "Please update the caption",
        });
      } else {
        res.status(200).json({
          message: "Posts Updated Successfully",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Database error",
      });
    });
};

//delete route
exports.deletePosts = (req, res) => {
  const postId = req.postId;
  // const { content } = req.body;
  client
    .query(`DELETE FROM  posts WHERE id ='${postId}';`)
    .then((data) => {
      res.status(200).json({
        message: "Posts Deleted Successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Database error",
      });
    });
};
