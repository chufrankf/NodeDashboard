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

