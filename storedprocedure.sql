CREATE DEFINER=`b17bff729dbf7d`@`%` PROCEDURE `createuser`(IN username varchar(255),IN user_name varchar(255),IN user_surname varchar(255),IN email varchar(255),IN user_type varchar(255) ,IN password varchar(255),IN salt varchar(255))
BEGIN
INSERT INTO users (`username` , user_name ,user_surname ,email ,user_type ,password ,salt) VALUES (username , user_name ,user_surname ,email ,user_type ,password,salt);
END

CREATE DEFINER=`b17bff729dbf7d`@`%` PROCEDURE `deleteuser`(IN uid INT)
BEGIN
DELETE FROM users WHERE id = uid;
END

CREATE DEFINER=`b17bff729dbf7d`@`%` PROCEDURE `getListOfUsers`()
BEGIN
SELECT \* FROM Users;
END

CREATE DEFINER=`b17bff729dbf7d`@`%` PROCEDURE `getUserInfo`(IN uid INT)
BEGIN
SELECT \* FROM Users WHERE id = uid;
END

CREATE DEFINER=`b17bff729dbf7d`@`%` PROCEDURE `login`(IN uname varchar(255))
BEGIN
SELECT \* FROM Users WHERE username = (uname);
END

CREATE DEFINER=`b17bff729dbf7d`@`%` PROCEDURE `updateuser`(IN username varchar(255),IN user_name varchar(255),IN user_surname varchar(255),IN email varchar(255),IN uid INT)
BEGIN
UPDATE Users SET username = username, user_name = user_name, user_surname = user_surname, email = email WHERE id = uid;
END