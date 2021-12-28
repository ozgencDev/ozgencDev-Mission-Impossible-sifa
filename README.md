# MISSION IMPOSSIBLE ALOTECH BOOTCAMP PROJECT

This is a graduation project from Alotech Bootcamp.

## TABLE OF CONTENT

- [Introduction](#introduction)
- [Technologies](#technologies)
- [Features](#features)
- [Build Process](#build-process)
- [Stored Procedure](#stored-procedure)
- [Contributors](#contributors)

# Introduction

This project is a Single Sign-on based web app. Users,tokens etc. are not stored in main app. We fetch the data from another app and obtain the data we can access to. The important values are not being shared with the main app.

- Main App Login Page

  ![This is an image](https://i.hizliresim.com/5fn7ihx.PNG)

  You can log in to your account with this page. If you dont have an account, you can create one for yourself. When you signed in, user's access token and refresh token is creating in the server side. After we reached to main page, server sends access token and refresh token to client. Access token stored in local storage and refresh token stored in database.

- Main Page / Dashboard

  ![This is an image](https://i.hizliresim.com/tkl3y9y.PNG)

  When we logged in, we see this page. You can access to the users table with menu on the left side.

- Users Table Page

  ![This is an image](https://i.hizliresim.com/tkl3y9y.PNG)

  Admin and users can see the whole users table on this page. Admin can make CRUD operations.

  Access token expires in 30 minutes. If it expires, client sends the refresh token to the server for a new access token. Server creates a new access token and sends to the client. Client stores the access token in local storage again.

# Technologies

Front end: ReactJS
Back end: nodeJS
Application Service: nginx
Web Services: RESTFUL API
Database: MySQL
Log: winston
Testing: Jest

# Features

- Admin:
  Can see the whole users table in database
  Create,update,delete users
- Users:
  Register and login
  Can see the whole users table in database

# Build Process

For Docker:

For Code Editor:
` cd client npm install npm start `
