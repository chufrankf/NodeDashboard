TRUNCATE TABLE settings;

INSERT INTO settings (setting, description, default_value)
VALUES ('Google Calendar Address', 'Address for your google calendar' ,'')
      ,('Enable User Requests', 'Enable others to send requests to your list' ,'N')
      ,('User Request Key', 'Key used to privatize your http address (\user\requests?user=USERNAME&key=KEY)' ,'');


TRUNCATE TABLE code_description;

INSERT INTO code_description (field, code, description)
VALUES 
 ('RQPRI', 1, 'Critical')
,('RQPRI', 2, 'High')
,('RQPRI', 3, 'Medium')
,('RQPRI', 4, 'Low')
,('RQPRI', 5, 'Optional')
,('RQSTS', 0, 'Removed')
,('RQSTS', 1, 'Requested')
,('RQSTS', 2, 'In Progress')
,('RQSTS', 3, 'Blocked')
,('RQSTS', 4, 'Completed')
,('RQSTS', 5, 'Rejected');