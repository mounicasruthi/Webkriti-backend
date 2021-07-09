# ConnectUp

# Project Description

**ConnectUp** is social media application, where users can share their posts, like those posts and connect with other users. The app allows users to stay anonymous with randomly generated profile pictures, and update or delete their posts with ease.

# Screenshots

![ss1](https://user-images.githubusercontent.com/78133928/125120804-a0e4af00-e110-11eb-9ad8-42900bf607e7.jpg)

![ss2](https://user-images.githubusercontent.com/78133928/125120831-ac37da80-e110-11eb-9634-aad2f6761f4c.jpg)

![ss3](https://user-images.githubusercontent.com/78133928/125120850-b3f77f00-e110-11eb-96bb-d28fe4c4f127.jpg)

![ss4](https://user-images.githubusercontent.com/78133928/125120872-bc4fba00-e110-11eb-80bf-b5cd080c0ecb.jpg)

![ss5](https://user-images.githubusercontent.com/78133928/125120918-c96ca900-e110-11eb-9b35-191937adc141.jpg)

![ss6](https://user-images.githubusercontent.com/78133928/125120938-d2f61100-e110-11eb-9f9c-b9dbbe6a5126.jpg)

![ss7](https://user-images.githubusercontent.com/78133928/125120987-e43f1d80-e110-11eb-81f6-21a1829a2c8c.jpg)

![ss8](https://user-images.githubusercontent.com/78133928/125121011-ebfec200-e110-11eb-987b-718d3af1b0fc.jpg)

![ss9](https://user-images.githubusercontent.com/78133928/125121035-f4ef9380-e110-11eb-8f46-a7f2d2ac8b7b.jpg)

![ss10](https://user-images.githubusercontent.com/78133928/125121063-fe78fb80-e110-11eb-89d9-2b31ee8c2a8a.jpg)

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
