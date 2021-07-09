const client = require("../configs/db");
const formidable = require("formidable");
const cloudinary = require("../configs/cloudinary");

//create post route
exports.createPost = async (req, res) => {
  //creating a new form
  const form = new formidable.IncomingForm();
  //parsing the contents of new form
  form.parse(req, (error, fields, file) => {
    //if an error happens, it displays an error message
    if (error) {
      return res.status(400).json({
        error: "Error creating post",
      });
    }

    //checking the length of file uploaded and looking that if the length of file is zero,that is no file is given
    else if (!(Object.keys(file).length > 0)) {
      //checking the length of the content and looking that if the length of content is zero,that is no content is given
      if (fields.content.length === 0) {
        //if neither image,nor content is given by user then it shows the message stating cannt create an empty post
        res.status(400).json({
          message: "Cannot create an empty post",
        });
      } else {
        //if the content is given by user, it inserts email, name and content in posts table
        client
          .query(
            `INSERT INTO posts (email,name,content) VALUES ('${req.email}','${req.name}','${fields.content}');`
          )
          //if data is inserted successfully into posts table,it shows a message that post is created successfully
          .then((data) => {
            res.status(200).json({
              message: "Post created successfully",
            });
          })
          //if any error happens during the process, it shows database error
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              message: "Database error",
            });
          });
      }
    } else {
      console.log(fields, file);
      //uploading the files to cloudinary
      cloudinary.uploader.upload(file.image.path, (err, result) => {
        console.log(err, result);
        //checking that if the content is undefined then setting it to blank string
        if (fields.content == undefined) {
          fields.content = "";
        }
        //insert email,name,content and image to posts table
        client
          .query(
            `INSERT INTO posts (email,name,content,image) VALUES ('${req.email}','${req.name}','${fields.content}', '${result.secure_url}');`
          )
          //if data is inserted successfully to posts table,it displays a success ,essage that post is created
          .then((data) => {
            res.status(200).json({
              message: "Post created successfully",
            });
          })
          //if an error happens it shows database error
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

//likes route
exports.likesCount = (req, res) => {
  //taking postId in the body
  const postId = req.body.postId;
  //selecting everything from likes table, corresponding to a specific post id and specific email
  client
    .query(
      `SELECT * FROM likes WHERE postid = '${postId}' AND email = '${req.email}';`
    )
    //if the same row is repeated that is if its length is greater than zero then it displays a message stating user has already liked the post
    .then((data) => {
      if (data.rows.length > 0) {
        res.status(400).json({
          error: "User has already liked the post",
        });
      }
      //if the user has not liked the post, then it inserts the details of that user in likes table
      else {
        client
          .query(
            `INSERT into likes (email,postid) VALUES ('${req.email}','${postId}'); `
          )
          //selecting the post with a specific postId from the posts table
          .then((data2) => {
            client
              .query(`SELECT * FROM posts WHERE id = '${postId}';`)
              //incrementing the likes by one
              .then((data3) => {
                const currLikes = data3.rows[0].likes;
                const newLikes = currLikes + 1;
                //updating the new likes of a specific postId in posts table
                client
                  .query(
                    `UPDATE posts set likes = '${newLikes}' WHERE id='${postId}';`
                  )
                  //if the likes are updated it shows a success message saying likes updated successfully
                  .then((data4) => {
                    res.status(200).json({
                      message: "Likes updated successfully",
                      newLikes,
                    });
                  })
                  //if an error happens while updating the likes it shows database error
                  .catch((err4) => {
                    console.log(err);
                    res.status(500).json({
                      message: "Database error",
                    });
                  })
                  //if the likes is not incremented it shows database error
                  .catch((err3) => {
                    res.status(500).json({
                      message: "Database error",
                    });
                  });
              })
              //if an error occurs while fetching data from posts table it shows database error
              .catch((err2) => {
                res.status(500).json({
                  message: "Database error",
                });
              });
          })
          //if an error happens in the entire liking process it shows database error
          .catch((err1) => {
            res.status(400).json({
              error: "User has already liked the post",
            });
          });
      }
    });
};

//get posts of a specific user route
exports.getPosts = (req, res) => {
  //selecting the rows from the posts table for a specific email
  client
    .query(`SELECT * FROM posts WHERE email='${req.email}';`)
    .then((data) => {
      const postData = data.rows;
      const newdata = postData.map((post) => {
        //displaying  the data of that specific user
        return {
          postId: post.id,
          name: post.name,
          content: post.content,
          image: post.image,
          likes: post.likes,
        };
      });
      console.log(newdata);
      //if data is displayed successfully it shows a success message
      res.status(200).json({
        message: "Data Displayed Successfully",
        data: newdata,
      });
    })
    //if any error happens during the process it shows database error
    .catch((err) => {
      res.status(500).json({
        message: "Database error",
      });
    });
};

//get all posts route
exports.getAllPosts = (req, res) => {
  console.log("getting all posts");
  //selecting every row from the posts table
  client
    .query(`SELECT * FROM posts;`)
    .then((data) => {
      console.log(data);
      const postData = data.rows;
      const newdata = postData.map((post) => {
        //displaying data of each user
        return {
          postId: post.id,
          name: post.name,
          content: post.content,
          image: post.image,
        };
      });
      //if everything is displayed properly, it shows a success message
      console.log(newdata);
      res.status(200).json({
        message: "Data Displayed Successfully",
        data: newdata,
      });
    })
    //if any error happens during the process it shows database error
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
  //updating the content of a corresponding postId
  client
    .query(`UPDATE posts set content = '${content}' WHERE id='${postId}';`)
    .then((data) => {
      //if content is not updated it shows a message to user to update the caption
      if (!content) {
        res.status(400).json({
          message: "Please update the caption",
        });
      }
      //if everything goes fine, it shows a success message that post is updated
      else {
        res.status(200).json({
          message: "Posts Updated Successfully",
        });
      }
    })
    //if any error occurs during the process it shows database error
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Database error",
      });
    });
};

//delete route
exports.deletePosts = (req, res) => {
  const postId = req.body.postId;
  //taking everything from posts table with a specific postId and deleting it
  client
    .query(`DELETE FROM  posts WHERE id ='${postId}';`)
    .then((data) => {
      //if post is deleted a success response is sent saying post deleted
      res.status(200).json({
        message: "Posts Deleted Successfully",
      });
    })
    //if an error occurs during the process it shows database error
    .catch((err) => {
      res.status(500).json({
        message: "Database error",
      });
    });
};
