drop user woliba@localhost;
flush privileges;
CREATE USER 'woliba'@'localhost' IDENTIFIED WITH mysql_native_password BY 'woliba123';
DROP DATABASE IF EXISTS woliba_backend;
DROP DATABASE IF EXISTS woliba_backend_test;
CREATE DATABASE woliba_backend;
CREATE DATABASE woliba_backend_test;
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, INDEX, DROP, ALTER, CREATE TEMPORARY TABLES, LOCK TABLES ON woliba_backend.* TO 'woliba'@'localhost';
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, INDEX, DROP, ALTER, CREATE TEMPORARY TABLES, LOCK TABLES ON woliba_backend_test.* TO 'woliba'@'localhost';