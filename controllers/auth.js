const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const tempData = [
  {
    name: "Mounica",
    email: "mounica@gmail.com",
    password: "mounicaweb",
  },
  {
    name: "Arushi",
    email: "arushi@gmail.com",
    password: "arushiweb",
  },
  {
    name: "Disha",
    email: "disha@gmail.com",
    password: "dishaweb",
  },
];

exports.signup = (req, res) => {
  // {
  //     name: "Mounica",
  //     email: "mounica@gmail.com",
  //     password: "mounicaweb"
  // }

  const { name, email, password } = req.body;
  console.log(name, email, password);

  //Check if the user already exists in the database or not
  const isValid = tempData.findIndex((e) => e.email === email);

  if (isValid != -1) {
    res.status(400).json({
      error: "User already exists",
    });
  }

  //Hash password
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      res.status(400).json({
        error: "Internal server error",
      });
    }
    const user = {
      name,
      email,
      password: hash,
    };
    tempData.push(user);

    console.log(tempData);
    res.status(200).json({
      message: "User added successfully",
      token: token,
    });
  });

  //Generate token
  const token = jwt.sign(
    {
      email: email,
    },
    process.env.secret_key
  );

  //Send response to user along with the token
};

exports.signin = (req, res) => {
    
};
