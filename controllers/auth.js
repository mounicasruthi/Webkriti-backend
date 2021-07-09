const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client = require("../configs/db");

exports.signup = (req, res) => {
  const { name, email, password } = req.body; //taking name, email and password in body everytime a user signs up

  client
    .query(`SELECT * FROM users where email = '${email}';`)
    .then((data) => {
      isValid = data.rows;

      if (isValid.length != 0) {
        //if length of the array is not empty then the user already exists
        res.status(400).json({
          error: "User already exists",
        });
      } else {
        //if the user does not exist we are hashing the password
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            res.status(400).json({
              error: "Internal server error",
            });
          }
          const user = {
            //the array user has name,email and password objects
            name,
            email,
            password: hash,
          };

          client
            .query(
              `INSERT INTO users (name, email, password) VALUES ('${user.name}', '${user.email}', '${user.password}');`
            ) //inserting name, email and password(hashed) in database
            .then((data) => {
              //if the user is signed up to the databse a token is generated for the user
              const token = jwt.sign(
                {
                  email: email,
                },
                process.env.SECRET_KEY
              );
              // a success message and a token is sent back to the user as response
              res.status(200).json({
                message: "User added successfully",
                token: token,
              });
            })
            .catch((err) => {
              //if an error occurs while saving the data to databse this response is sent
              res.status(500).json({
                error: "Database error occurred",
              });
            });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "Database error occurred",
      });
    });
};

exports.signin = (req, res) => {
  const { email, password } = req.body; //taking email and password in body everytime a user signs in

  client
    .query(`SELECT * FROM users where email = '${email}';`) //selecting all values from users table with a particular email
    .then((data) => {
      userData = data.rows; //assigning the data of a particular email to userData array

      if (userData.length == 0) {
        //if the length of array is zero the user does not exist in databse
        res.status(400).json({
          error: "User does not exist, sign up instead",
        });
      } else {
        //if user already exists in the database we will need to check the password
        bcrypt.compare(password, userData[0].password, (err, result) => {
          if (err) {
            res.status(500).json({
              error: "Server error", //while comparing the passwords if an error occurs this response is sent
            });
          } else if (result == true) {
            //if the passwords match, the password stored in database and the password entered by user we sign token for the user
            const token = jwt.sign(
              {
                email: email,
              },
              process.env.SECRET_KEY
            );
            res.status(200).json({
              message: "User signed in successfully",
              token: token, //if the user is signed in successfully we display a token
            });
          } else {
            res.status(400).json({
              error: "Enter correct password", //if the password is not correct this response is sent
            });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "Database error occurred", //if there is an error while finding the user in databse an error message is sent
      });
    });
};

//getuser route
exports.getuser = (req, res) => {
  client
    .query(`SELECT * from users where email = '${req.email}'`)
    .then((data) => {
      console.log(data);
      const { name, email, id } = data.rows[0];
      // const newdata = userData.map((post) => {
      //   return {
      //     postId: post.postid,
      //     name: post.name,
      //     content: post.content,
      //     image: post.image,
      //   };
      // });
      // console.log(newdata);
      // res.status(200).json({
      //   message: "Data Displayed Successfully",
      //   data: newdata,
      // });
      res.send({
        name,
        email,
        id,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Database error",
      });
    });
};

