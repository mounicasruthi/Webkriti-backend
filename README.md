# ConnectUp

# Project Description

**ConnectUp** is social media application, where users can share their posts, like those posts and connect with other users. The app allows users to stay anonymous with randomly generated profile pictures, and update or delete their posts with ease.

# Screenshots

![ss1]()

![ss2]()

![ss3]()

![ss4]()

![ss5]()

![ss6]()

![ss7]()

# Hosted URL

https://connectup.netlify.app/

# Test Credentials

Email: test2@gmail.com

Password: test2web

# Features Implemented

## 1. Frontend

- Each user has a profile page where they can see their individual posts, and a feed page where they can see the posts of other users as well.
- An interesting feature is the randomly generated profile pictures assigned to each user at sign up.
- The user can create posts with images and captions.
- The user can like posts of other users and like their own posts as well.
- Updation and deletion of posts can be done too.
- The user can log out from any page and get redirected to the landing page.

## 2. Backend

1. Auth Routes

- Sign up
- Log in
- Get User for user details
- Verification using JWT token

2. Posts Routes

- Create post
- Get posts of user
- Get all posts of users
- Update posts
- Delete posts
- Like posts

# Technologies/Libraries/Packages Used

## 1. Frontend

- HTML
- CSS
- JavaScript

## 2. Backend

- Node
- Express
- Cloudinary
- Formidable
- PostgreSQL
- JWT
- Bcrypt

# Local Setup

## 1. Frontend

1. Fork the repository and clone it using git clone URL.
2. Open the folder containing the cloned repository and run "npm install".
3. Create a .env file with the same contents as the given .env file.
4. You can either deploy the backend separately and use the hosted link or run locally and use that link after setting up the backend (see below).
5. After you successfully add the backend url to your .env file you can run npm start and start working locally.

## 2. Backend

1. Fork the repository and clone it using git clone URL.
2. Open the folder which contains the cloned repository and run "npm install".
3. Create a .env file same as the given env file (.example.env).
4. Set up a PostgreSQL database and put the URL into the .env file.
5. Add a secret value to .env file.
6. Run "npm run dev".

# Team Members

- Arushi Agrawal (2020IMT-017)
- Disha Singh (2020IMT-030)
- Mounica Sruthi Kakkirala (2020IMT-061)
