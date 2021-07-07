const client = require("../configs/db");
const formidable = require("formidable");
const util = require("util");
const cloudinary = require("../configs/cloudinary");

//create route
exports.createPost = (req, res) => {
  const { content } = req.body;
  //add code to check if content/image is empty (40:00)
  client
    .query(
      `INSERT INTO posts (email, content) VALUES ('${req.email}', '${content}');`
    )
    .then((data) => {
      res.status(200).json({
        message: "Post created successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Databse error",
      });
    });
};

// //uploadImage router
exports.uploadImage = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (error, fields, file) => {
    if (error) {
      return res.status(400).json({
        error: "Problem creating product!",
      });
      // formidable.fields ={
      //  text: text,
      // file: image
      // };
    }
    console.log(fields, file);
    // res.json({ fields, file });
    cloudinary.uploader.upload(file.image.path, (err, result) => {
      console.log(result);
      // if (result.public_id) {
      //   res.writeHead(
      //     200,
      //     { "content-type": "text/plain" },
      //     { "content-type": "image/jpeg" }
      //   );
      //   res.write("received uploads:\n\n");
      //   res.end(util.inspect({ fields: fields, file: result.secure_url }));
      // }
      client
        .query(
          `INSERT INTO posts (email,content,image) VALUES ('hyeee','${fields.hyeee}', '${result.secure_url}');`
        )
        .then((data) => {
          console.log("hye");
          res.status(200).json({
            message: "Post created successfully",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            message: "Databse error",
          });
        });
    });
  });
};

//   console.log("hye");
//   client
//     .query(`INSERT INTO posts (image) VALUES ('${image}');`)
//     .then((data) => {
//       res.status(200).json({
//         message: "Post created successfully",
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         message: "Databse error",
//       });
//     });
// };

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
        message: "Databse error",
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
        message: "Databse error",
      });
    });
};

//update route
exports.updatePosts = (req, res) => {
  const postId = req.postId;
  const { content, image } = req.body;
  client
    .query(
      `UPDATE posts set content = '${content}', image = '${image}' WHERE postId='${postId}';`
    )
    .then((data) => {
      res.status(200).json({
        message: "Posts Updated Successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Databse error",
      });
    });
};

//delete route
exports.deletePosts = (req, res) => {
  const postId = req.postId;
  const { content } = req.body;
  client
    .query(`DELETE FROM  posts WHERE postId='${postId}';`)
    .then((data) => {
      res.status(200).json({
        message: "Posts Deleted Successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Databse error",
      });
    });
};
