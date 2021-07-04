const client = require("../configs/db");

//create route
exports.createPost = (req, res ) => {
    const { content} = req.body;
    //add code to check if content/image is empty (40:00) 
    client.query(`INSERT INTO posts (email, content) VALUES ('${req.email}', '${content}');`)
    .then(data => {
        res.status(200).json({ 
            message: "Post created successfully"
        });
    })
    .catch(err => {
        res.status(500).json({
            message: "Databse error" 
        });
    });
};

//get posts of a specific user route
exports.getPosts = (req, res) =>{
  client.query(`SELECT * FROM posts WHERE email='${req.email}';`)
  .then(data => {
     const postData = data.rows;
    const newdata= postData.map((post)=>{
         return{
             postId: post.postid,
             content: post.content,
         };
     });
     console.log(newdata);
    res.status(200).json({ 
        message: "Data Displayed Successfully",
        data: newdata,
    });
})
.catch(err => {
    res.status(500).json({
        message: "Databse error" 
    });
});
};

//get all posts route
exports.getAllPosts = (req, res) => {
    client.query(`SELECT * FROM posts;`)
  .then(data => {
     const postData = data.rows;
    const newdata= postData.map((post)=>{
         return{
             postId: post.postid,
             content: post.content,
         };
     });
     console.log(newdata);
    res.status(200).json({ 
        message: "Data Displayed Successfully",
        data: newdata,
    });
})
.catch(err => {
    res.status(500).json({
        message: "Databse error" 
    });
});

};

//update route
exports.updatePosts = (req, res)=>{
    const postId= (req.postId);
    const { content} = req.body;
    client.query(`UPDATE posts set content = '${content}' WHERE postId='${postId}';`)
    .then(data => {
       res.status(200).json({ 
           message: "Posts Updated Successfully",
       });
   })
   .catch(err => {
       res.status(500).json({
           message: "Databse error" 
       });
   });
   };

//delete route
   exports.deletePosts = (req, res)=>{
    const postId= (req.postId);
    const { content} = req.body;
    client.query(`DELETE FROM  posts WHERE postId='${postId}';`)
    .then(data => {
       res.status(200).json({ 
           message: "Posts Deleted Successfully",
       });
   })
   .catch(err => {
       res.status(500).json({
           message: "Databse error" 
       });
   });
   };