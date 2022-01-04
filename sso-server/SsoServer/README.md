# MISSION IMPOSSIBLE ALOTECH BOOTCAMP PROJECT

## SERVER DOCUMENTATION

- [Introduction](#introduction)
- [Schema of Server](#schema-of-server)
- [Algorithm Flowchart](#algorithm-flowchart)
- [Interaction Diagram](#interaction-diagram)
- [Database Diagram](#database-diagram)

## Introduction

This project is a Single Sign-on based web app. This documentation is about this app's server side.

## Schema of Server

![This is an image](https://i.hizliresim.com/lkkgpcn.png)

Server has two endpoints. Their names are Auth and Api.
Auth has two routes:

- Login: This route being requested when a user wants to log in.
- Refresh: This route being requested when an access token expired.

Api has five routes:

- Create: Creating a new user
- Update: Updating a user
- Delete: Deleting a user
- Users: Getting all users from database
- User/id : Getting a user from database

Also Api has two middlewares:

- saltHash: Hashing the users' passwords
- isAuthorized: Checking if user has been authorized

## Algorithm Flowchart

You can see app's algorithm flowchart below:

![This is an image](https://i.hizliresim.com/b40xp6d.png)

When we enter the app for the first time, the isAuthorized middleware works. After that, if the user hasn't been authorized, it redirect us to the login page.

If we don't have an account, we can register. When we register, our informations being stored to the database. Before storing the password to database, saltHash middleware combine the password with the salt value. (Salt is a random and an unique value. We store the salt value with the user's attributes.) After the combination, it hashes it and the new crypted password being stored in the database.

If we have an account, we can login to the app. We can login with username and password. When we login, the password we entered being crypted again. If it matches with the password in the database, we will be logged in. If it doesn't match, we can't.

After these steps, we can access to the home page of our profile.

After 15 minutes, the access token being expired. When it expires, the refresh route creates a new access token and sends to the client again. So we don't have to log in again.

## Interaction Diagram

The interaction diagram of the refresh token and access token is in the below.
![This is an image](https://i.hizliresim.com/3lykz86.png)

When the user logged in, we create an access token and a refresh token in the auth/login route. After they created, we send this tokes to the client. (Access token being stored in the client, local storage. Refresh token is being stored in the database.)The access token's expire time is 15 minutes. After 15 minutes, access token will be expired so, there will be an invalid token error. When the client got the error, it sends the refresh token back to the server. The refresh route gets the refresh token and verifies it. We pull the username from the refresh token and create a new access token with the username. The new access token being send to the client again.

## Database Diagram

The database diagram is in the below.

![This is an image](https://i.hizliresim.com/gucysmp.png)

The database has two tables. Tables' names are users and tokens. It stores the users' attributes in the users table. It also stores the refresh tokens in the tokens table. One of the token's attribute is user id.
This attribute shows who owns the token.
