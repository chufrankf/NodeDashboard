/*
* Adding new user with specific permissions
*/

CREATE USER 'ndev'@'localhost' IDENTIFIED BY 'password';
GRANT SELECT,INSERT,UPDATE,DELETE
ON NodeDashboard.*
TO 'ndev'@'localhost';