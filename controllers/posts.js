const client = require("../configs/db");
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