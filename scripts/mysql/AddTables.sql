/*
* Create dashboard contents table
* The purpose of this table is to save the user settings for their dashboards
* dash_id - id of the dashboard
* user_id - id of the user
* contents - NO_LONGER_USED
*/
CREATE TABLE IF NOT EXISTS dashboards (
 dash_id TINYINT UNSIGNED NOT NULL
,user_id VARCHAR(30) NOT NULL
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
,field01 VARCHAR(512) NULL
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

/*
* Create user settings
* For each user created there will be settings for the user. If not use the default
* user_id - id of the user
* setting - setting name
* value - user set value of the setting
*/
CREATE TABLE IF NOT EXISTS user_settings (
 user_id VARCHAR(30) NOT NULL
,setting VARCHAR(255) NOT NULL
,value VARCHAR(255) NULL
,primary key(user_id, setting)
);

/*
* Settings details
* list of settings and their discriptions. contains default values in the case that the user settings are null
* setting - setting name
* description - description of the setting
* value - user set value of the setting
*/

CREATE TABLE IF NOT EXISTS settings (
 setting VARCHAR(255) NOT NULL
,description VARCHAR(1025) NULL
,default_value VARCHAR(255) NULL
,primary key(setting)
);

/*
* User Requests
* Lists of requests made to each user. A requestee may recieve multiple requests from multiple requestors
* requestee - id of the user
* requestor - name of the requestor
* seq - number of the request
* request - detailed description of the request
* priority - numeric value describing the priority (1 - Highest, 5 - Lowest)
* status - what is the current status of this request
*        1. Requested
*        2. On To-do
*        3. Blocked
*        4. Completed
*        5. Rejected
*/

CREATE TABLE IF NOT EXISTS user_requests (
 seq INT NOT NULL
,requestee VARCHAR(30) NOT NULL
,requestor VARCHAR(125) NOT NULL
,priority TINYINT NOT NULL DEFAULT 3
,request VARCHAR(255)
,status TINYINT NOT NULL DEFAULT 1
,created_by VARCHAR(125) NOT NULL
,edited_by VARCHAR(125) NOT NULL
,primary key(requestee, seq)
);

/*
* Code Table
* This is a code table that will be used to get names of certain numeric codes
* field: name of the type of code in question
* code: numeric number of the code
* description: text describing the code, will be used in getting names
*/

CREATE TABLE IF NOT EXISTS code_description (
 field VARCHAR(5) NOT NULL
,code INT NOT NULL
,description VARCHAR(64)
,primary key(field, code)
);

