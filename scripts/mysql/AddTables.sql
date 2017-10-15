/*
* Create dashboard contents table
* The purpose of this table is to save what the user puts into the dashboard.
* The contents will be inserted into the html when opened.
* dash_id - id of the dashboard
* user_id - id of the user
* contents - the inside of the users dashboard
*/
CREATE TABLE IF NOT EXISTS dash_contents (
 dash_id TINYINT UNSIGNED NOT NULL
,user_id VARCHAR(30) NOT NULL
,contents TEXT
,primary key(dash_id, user_id)
);

/*
* Create user
* The purpose of this table is to save the users and their information
* user_id - id of the user
* pass - password of the user
* email - email
*/
CREATE TABLE IF NOT EXISTS users (
 user_id VARCHAR(30) NOT NULL
,pass VARCHAR(30) NOT NULL
,email VARCHAR(60) NOT NULL
,primary key(user_id)
,unique (email)
);