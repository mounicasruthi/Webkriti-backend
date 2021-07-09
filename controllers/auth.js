const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client = require("../configs/db");

exports.signup = (req, res) => {
  //taking name, email and password in body everytime a user signs up
  const { name, email, password } = req.body;

  client
    .query(`SELECT * FROM users where email = '${email}';`)
    .then((data) => {
      isValid = data.rows;

      //if length of the array is not empty then the user already exists
      if (isValid.length != 0) {
        res.status(400).json({
          error: "User already exists",
        });
      } else {
        //if the user does not exist we are hashing the plain password entered by the user
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            res.status(400).json({
              error: "Internal server error",
            });
          }

          //the array user has name, email and password
          const user = {
            name,
            email,
            password: hash,
          };
          console.log(user);

          //inserting name, email and password(hashed) in database
          client
            .query(
              `INSERT INTO users (name, email, password) VALUES ('${user.name}', '${user.email}', '${user.password}');`
            )

            //if the user is signed up to the databse a token is generated for the user
            .then((data) => {
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

            //if an error occurs while saving the data to databse this response is sent
            .catch((err) => {
              res.status(500).json({
                error: "Database error occurred",
              });
            });
        });
      }
    })

    //if an error occus while checking for the user this error is sent
    .catch((err) => {
      res.status(500).json({
        error: "Database error occurred",
      });
    });
};

exports.signin = (req, res) => {
  //taking email and password in body everytime a user signs in
  const { email, password } = req.body;

  //selecting all values from users table with a particular email
  client
    .query(`SELECT * FROM users where email = '${email}';`)
    .then((data) => {
      userData = data.rows; //assigning the data of a particular email to userData array

      //checking if the user already exists in database or not
      if (userData.length == 0) {
        res.status(400).json({
          error: "User does not exist, sign up instead",
        });
      } else {
        //if user already exists in the database we will need to check the password entered by user and password stored in database
        bcrypt.compare(password, userData[0].password, (err, result) => {
          if (err) {
            //while comparing the passwords if an error occurs this response is sent
            res.status(500).json({
              error: "Server error",
            });
          }
          //if the passwords match that is, the password stored in database and the password entered by user we sign token for the user
          else if (result == true) {
            const token = jwt.sign(
              {
                email: email,
              },
              process.env.SECRET_KEY
            );
            //if the user is signed in successfully we display a resposne and a token
            res.status(200).json({
              message: "User signed in successfully",
              token: token,
            });
          } else {
            //if the password is not correct this response is sent
            res.status(400).json({
              error: "Enter correct password",
            });
          }
        });
      }
    })
    //if there is an error while finding the user in databse an error message is sent
    .catch((err) => {
      res.status(500).json({
        error: "Database error occurred",
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
      //sending name email and password as response
      res.send({
        name,
        email,
        id,
      });
    })
    //if an error occurs while fetchung the data this response is sent
    .catch((err) => {
      res.status(500).json({
        message: "Database error",
      });
    });
};
