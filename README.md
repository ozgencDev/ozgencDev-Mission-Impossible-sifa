# MISSION IMPOSSIBLE ALOTECH BOOTCAMP PROJECT

This is a graduation project from Alotech Bootcamp.

## TABLE OF CONTENT

- [Introduction](#introduction)
- [Technologies](#technologies)
- [Features](#features)
- [Build Process](#build-process)
- [Stored Procedure](#stored-procedure)
- [API Link](#api-link)
- [Contributors](#contributors)

# Introduction

This project is a Single Sign-on based web app. Users and tokens are not stored in main app. We fetch the data we can access from another application. The important values are not being shared with the main app.

- LOGIN PAGE

  ![This is an image](https://i.hizliresim.com/5fn7ihx.PNG)

  You can log in to your account with this page. If you don't have an account, you can create one for yourself. When you signed in, user's access token and refresh token is creating in the server side. After we reached to main page, server sends access token and refresh token to client. Access token is stored in local storage and refresh token is stored in database.

- MAIN PAGE

  ![This is an image](https://i.hizliresim.com/bzehoe4.PNG)

  This page welcomes us when we log in. Admins can access to the users table with menu on the left side.

- USERS PAGE

  ![This is an image](https://i.hizliresim.com/hluan9t.PNG)

  Admins can see the whole users table on this page. Admin can make CRUD operations.

  Access token expires in 30 minutes. If it expires, client sends the refresh token to the server for a new access token. Server creates a new access token and sends to the client. Client stores the access token in local storage again.

  When user or admin logs out the access token being deleted from local storage. Also refresh token being deleted from database.

# Diagrams

[README.md for Diagrams](server/README.md)

# Technologies

- Front end: ReactJS
- Back end: nodeJS
- Web Services: RESTFUL API
- Database: MySQL
- Log Database: MongoDB
- Log: winston
- Testing: Jest

# Features

- Admin:
  - Login
  - Can see the whole users table in database
  - Create,update,delete users
- Users:
  - Register and login

# Build Process

For Code Editor:

- For Client:
  ```
  cd client
  npm install
  npm start
  ```
- For Server:
  ```
  cd server
  npm install
  npm start
  ```

# API and Frontend Deploy Link

- [API](http://mission-alot.herokuapp.com/)
- [Front End](https://mission-impossible.vercel.app/login)

# Contributors

- [Sevda Avcılar](https://github.com/sevdavc)
- [Ali Özgenç](https://github.com/ozgencDev)
- [İlker Kurtulan](https://github.com/ilkerkurtulan97)
- [Furkan Ceylan](https://github.com/furkan-ceylan)
