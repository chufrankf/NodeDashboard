/*
* Create dashboard contents table
* The purpose of this table is to save the user settings for their dashboards
* dash_id - id of the dashboard
* user_id - id of the user
* contents - NO_LONGER_USED
*/
CREATE TABLE IF NOT EXISTS dash_contents (
 dash_id TINYINT UNSIGNED NOT NULL
,user_id VARCHAR(30) NOT NULL
,contents TEXT
,primary key(dash_id, user_id)
);

/*
* Create box contents table
* The purpose of this table is to save the user settings for each box and what the contents.
* dash_id - id of the dashboard
* user_id - id of the user
* box_id - id of the box
* box_type - numeric type of the box
* gs_x - x location of the box
* gs_y - y location of the box
* gs_height - height of the box
* gs_width - width of the box
* contents - html contents of the box
*/
CREATE TABLE IF NOT EXISTS dashbox_contents (
 dash_id TINYINT UNSIGNED NOT NULL
,user_id VARCHAR(30) NOT NULL
,box_id SMALLINT UNSIGNED NOT NULL
,box_type VARCHAR(30)
,gs_x SMALLINT UNSIGNED NOT NULL
,gs_y SMALLINT UNSIGNED NOT NULL
,gs_height SMALLINT UNSIGNED NOT NULL
,gs_width SMALLINT UNSIGNED NOT NULL
,custom_hash VARCHAR(30) NULL
,webpage VARCHAR(512) NULL
,primary key(dash_id, user_id, box_id)
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